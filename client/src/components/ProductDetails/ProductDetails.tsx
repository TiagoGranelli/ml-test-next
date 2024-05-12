"use client"; 
import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
  sold_qty: number;
  description: string;
}

interface ProductDetailsProps {
  productId: string;
}

const ProductDetails = ({productId}: ProductDetailsProps) => { 
  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<string[]>([]); 
 
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get<{ item: Product; categories: string[] }>(`http://localhost:3001/api/product/${productId}`);
        setProduct(response.data.item);
        setCategories(response.data.categories);
      } catch (error) {
        console.error('Erro ao buscar detalhes do produto:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h2>{product.title}</h2>
      <Image src={product.picture_url} alt={product.title}  width={100} height={100}/>
      <p>Preço: {product.price.amount}</p>
      <p>Condição: {product.condition}</p>
      <p>Frete grátis: {product.free_shipping ? 'Sim' : 'Não'}</p>
      <p>Quantidade vendida: {product.sold_qty}</p>
      <p>Descrição: {product.description}</p>
      <ul>
        {categories?.map((category) => (
          <li key={category}>{category}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductDetails;