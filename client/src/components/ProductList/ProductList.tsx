"use client";
import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

interface Product { 
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

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const search  = searchParams.get('search');

  useEffect(() => {
    const fetchProducts = async () => { 
      try {
        const response = await axios.get<{ items: Product[]; categories: string[] }>(`http://localhost:3001/api/items?search=${search}`); 
        setProducts(response.data.items);
        setCategories(response.data.categories);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    if (search) {  
      fetchProducts();
    }
  }, [search]);

  return (
    <div>
      <h2>Resultados da pesquisa para: {search}</h2>
      <ul>
        {categories?.map((category) => (
          <li key={category}>{category}</li>
        ))}
      </ul> 
      <ul>
        {products?.map((product) => ( 
          <li key={product.id}>
            <Link href={`/product/${product.id}`}> 
              <Image src={product.picture_url} alt={product.title} width={100} height={100} />
              <h3>{product.title}</h3>
              <p>Preço: {product.price.amount}</p>
              <p>Condição: {product.condition}</p>
              <p>Frete grátis: {product.free_shipping ? 'Sim' : 'Não'}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;