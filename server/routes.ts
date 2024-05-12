import { Router, Request, Response } from 'express';
import axios from 'axios';

const router = Router();
const API_BASE_URL = 'https://api.mercadolibre.com/sites/MLB/search';

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

// Search items by query
router.get('/api/items', async (req: Request, res: Response) => {
    const search: string = req.query.search as string;
    try {
        const response = await axios.get(`${API_BASE_URL}?q=${encodeURIComponent(search)}`);
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
            items: items
        });
    } catch (error: any) {
        res.status(500).json({ message: "Error fetching data from MercadoLibre", error: error.message });
    }
});

// Get item details by ID
router.get('/api/product/:id', async (req: Request, res: Response) => {
    const id: string = req.params.id;
    try {
        const response = await axios.get(`https://api.mercadolibre.com/items/${id}`);
        const item = response.data;
        const descriptionResponse = await axios.get(`https://api.mercadolibre.com/items/${id}/description`);
        const description = descriptionResponse.data;
        res.json({
            item: {
                id: item.id,
                title: item.title,
                price: {
                    currency: item.currency_id,
                    amount: Math.floor(item.price),
                    decimals: parseInt((item.price % 1).toFixed(2).substring(2)),
                },
                picture_url: item.thumbnail,
                condition: item.condition,
                free_shipping: item.shipping.free_shipping,
                sold_qty: item.sold_quantity,
                description: description.plain_text
            }
        });
    } catch (error: any) {
        res.status(500).json({ message: "Error fetching item details", error: error.message });
    }
});

export default router;
