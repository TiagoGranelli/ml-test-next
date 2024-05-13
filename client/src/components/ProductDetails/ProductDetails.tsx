"use client"; 
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import styles from "./ProductDetails.module.scss";
import BreadCrumb from '../BreadCrumb';
import LoadingDots from '../LoadingDots';
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
  sold_quantity: number;
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
    return <LoadingDots />;
  }

  return (
    <div className={styles.ProductDetailsContainer}>
      <div className={styles.Product}>
      <BreadCrumb categories={categories} />
        <div className={styles.flexContainer}>
          <div className={styles.imageContainer}>
            <Image className={styles.ProductImage} fill={true} priority={true} src={product.picture_url} alt={product.title} />
          </div>
        <div className={styles.ProductInfo}>
          <div className={styles.ProductCondition}>
            <span>{product.condition.toLowerCase() === 'new' ? 'Novo' : 'Usado'}</span>
            <span> - 234 vendidos {product.sold_quantity ?? product.sold_quantity}</span>{/* //TODO
            A API items/:id do mercadoLivre não está retornando o sold_quantity
            https://global-selling.mercadolibre.com/devsite/items-and-searches-global-selling 
            */}
          </div>
          <h1>{product.title}</h1>
          <span className={styles.ProductPriceContainer}>
            <div className={styles.ProductPrice}>
              <span>
                {product.price.currency ? 'R$ ' : ''}
                </span>
              <span className={styles.ProductAmount}>
                {product.price.amount}
              </span>
              <span className={styles.ProductPriceDecimals}>
                {product.price.decimals === 0 ? '00' : product.price.decimals}
              </span>
            </div>
            {product.free_shipping && 
            
              <Image className={styles.FreeShippingTag} src="/ic_shipping@2x.png.png" width={18} height={18} alt="Frete grátis"/>
            
            }
          </span>
          <a href={`https://www.mercadolivre.com.br`} target="_blank" >
            <button className={styles.ProductBuyBtn}>
              Comprar
            </button>
          </a>
        </div>
        </div>
        <div className={styles.ProductDescription}>
          <h2>
            Descrição
          </h2>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;