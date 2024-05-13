import { Router, Request, Response } from 'express';
import axios from 'axios';
import NodeCache from 'node-cache';

const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

const router = Router();
const BASE_URL = 'https://api.mercadolibre.com/';
const API_BASE_URL = `${BASE_URL}sites/MLB`;

interface Item {
  id: string;
  title: string;
  price: {
    currency: string;
    amount: number;
    decimals: number;
  };
  picture_url: string;
  condition: string;
  free_shipping: boolean;
}

interface CategoryResponse {
    category_id: string;
  }
  
interface Category {
name: string;
}
  
async function fetchCategoryId(search: string): Promise<string> {
    const cacheKey = `category_id_${search}`;
    const cachedCategoryId = myCache.get<string>(cacheKey);
    if (cachedCategoryId) {
        return cachedCategoryId;
    }
    const { data } = await axios.get<CategoryResponse[]>(`${API_BASE_URL}/domain_discovery/search?limit=8&q=${encodeURIComponent(search)}`);
    const categoryId = data[0].category_id;
    myCache.set(cacheKey, categoryId);
    return categoryId;
}
  

async function fetchCategoryPath(categoryId: string): Promise<string[]> {
    const cacheKey = `category_path_${categoryId}`;
    const cachedCategoryPath = myCache.get<string[]>(cacheKey);
    if (cachedCategoryPath) {
        return cachedCategoryPath;
    }
    const { data: { path_from_root } } = await axios.get<{ path_from_root: Category[] }>(`${BASE_URL}/categories/${categoryId}`);
    const categoryPath = path_from_root.map(category => category.name);
    myCache.set(cacheKey, categoryPath);
    return categoryPath;
}

  
const getCategoryTree = async (search: string): Promise<string[]> => {
    try {
        const categoryId = await fetchCategoryId(search);
        return await fetchCategoryPath(categoryId);
    } catch (error) {
        console.error("Failed to fetch category tree", error);
        throw error;
    }
}

router.get('/api/items', async (req: Request, res: Response) => {
    const search: string = req.query.search as string;
    try {
        const categories = await getCategoryTree(search)

        const response = await axios.get(`${API_BASE_URL}/search?&q=${encodeURIComponent(search)}`);
        const items: Item[] = response.data.results.map((item: any) => ({
            id: item.id,
            title: item.title,
            price: {
                currency: item.currency_id,
                amount: Math.floor(item.price),
                decimals: parseInt((item.price % 1).toFixed(2).substring(2)),
            },
            picture_url: item.thumbnail,
            condition: item.condition,
            free_shipping: item.shipping.free_shipping
        }));

        res.json({
            query: search,
            categories: categories,
            items: items,
        });
    } catch (error: any) {
        res.status(500).json({ message: "Error fetching data from MercadoLibre", error: error.message });
    }
});


router.get('/api/items/:id', async (req: Request, res: Response) => {
    const id: string = req.params.id;
    try {
        const [itemResponse, descriptionResponse] = await Promise.all([
            axios.get(`https://api.mercadolibre.com/items/${id}`),
            axios.get(`https://api.mercadolibre.com/items/${id}/description`)
        ]);
        const item = itemResponse.data;
        const description = descriptionResponse.data;
        const categories = await fetchCategoryPath(item.category_id)
        res.json({
            categories: categories, 
            item: {
                id: item.id,
                title: item.title,
                price: {
                    currency: item.currency_id,
                    amount: Math.floor(item.price),
                    decimals: parseInt((item.price % 1).toFixed(2).substring(2)),
                },
                picture_url: item.pictures[0].url,
                condition: item.condition,
                free_shipping: item.shipping.free_shipping,
                sold_quantity: item.sold_quantity ? item.sold_quantity : null, // a api do Mercado Livre não está retornando a quantidade vendida
                description: description.plain_text
            }
        });
    } catch (error) {
        console.error('Error fetching item details', error);
        throw new Error('Failed to fetch item details');
    }
});

export default router;
