"use client"; 
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import styles from "./ProductDetails.module.scss";
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
        const response = await axios.get<{ item: Product; categories: string[] }>(`http://localhost:3001/api/items/${productId}`);
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
    <div className={styles.ProductDetailsContainer}>
      <div className={styles.Product}>
        <div className={styles.flexContainer}>
        <Image priority={true} src={product.picture_url} alt={product.title}  width={680} height={800}/>
        <div className={styles.ProductInfo}>
          <span>{product.condition.toLowerCase() === 'new' ? 'Novo' : 'Usado'}</span>
          <span>Quantidade vendida: {product.sold_qty}</span>
          <h2>{product.title}</h2>
          <p className={styles.ProductPrice}>
            <span>
              {product.price.currency ? 'R$ ' : ''}
              </span>
            <span>
              {product.price.amount}
            </span>
            <span>
              {product.price.decimals ? `,${product.price.decimals}` : ''}
            </span>
            {product.free_shipping && 
            <span>
              <Image className={styles.FreeShippingTag} src="/ic_shipping.png" width={18} height={18} alt="Frete grátis"/>
            </span>
            }
          </p>
          <p>Frete grátis: {product.free_shipping ? 'Sim' : 'Não'}</p>
        </div>
        </div>
        <p className={styles.ProductDescription}>Descrição: {product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetails;