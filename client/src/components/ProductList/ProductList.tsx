"use client";
import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import styles from "./ProductList.module.scss";
import BreadCrumb from '../BreadCrumb';

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
    <div className={styles.ProductListContainer}>
      <ol className={styles.ProductList}>
        <BreadCrumb categories={categories} ></BreadCrumb>
        {products?.map((product) => ( 
          <li className={styles.Product} key={product.id}>
            <Link className={styles.ProductContainer} href={`/${product.id}`}>
              <Image className={styles.ProductImage} src={product.picture_url} alt={product.title} width={180} height={180} />
              <div className={styles.ProductInfoContainer}>
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