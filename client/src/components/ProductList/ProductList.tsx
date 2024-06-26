"use client";
import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import styles from "./ProductList.module.scss";
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
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const search  = searchParams.get('search');

  useEffect(() => {
    const fetchProducts = async () => {
      if (!search) return;
      setIsLoading(true);  // Start loading
      try {
        const response = await axios.get<{ items: Product[]; categories: string[] }>(`http://localhost:3001/api/items?search=${search}`);
        setProducts(response.data.items);
        setCategories(response.data.categories);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      } finally {
        setIsLoading(false);  // End loading
      }
    };
  
    fetchProducts();
  }, [search]);
  
  if (isLoading) {
    return <LoadingDots />;
  }

  return (
    <div className={styles.ProductListContainer}>
      <div className={styles.BreadCrumbContainer}>
      <BreadCrumb categories={categories} ></BreadCrumb>
      </div>
      <ol className={styles.ProductList}>
        {products?.map((product) => ( 
          <li className={styles.Product} key={product.id}>
            <Link className={styles.ProductContainer} href={`/${product.id}`}>
              <Image className={styles.ProductImage} src={product.picture_url} alt={product.title} width={180} height={180} />
              <div className={styles.ProductInfoContainer}>
              <span className={styles.ProductPriceContainer}>
                <div className={styles.ProductPrice}>
                <span>
                  {product.price.currency ? 'R$ ' : ''}
                  </span>
                <span className={styles.ProductAmount}>
                  {product.price.amount}
                </span>
                <span className={styles.ProductPriceDecimals}>
                  {product.price.decimals ? `${product.price.decimals}` : ''}
                </span>
                </div>
              </span>
                {product.free_shipping && 
                  <div className={styles.FreeShippingTag}>
                    <Image src="/ic_shipping@2x.png.png" width={18} height={18} alt="Frete grátis"/>
                    <span>Frete grátis</span>
                  </div>
                }
                <h2 className={styles.ProductTitle}>{product.title}</h2>
                <p>{product.condition.toLowerCase() !== 'new' ? 'Usado' : ''}</p>
                
              </div>
            </Link>
          </li>
        ))}
      </ol>
      

    </div>
  );
};

export default ProductList;