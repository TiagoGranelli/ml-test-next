"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import styles from "./SearchBox.module.scss";
import Image from 'next/image';

const SearchBox: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter(); 
 
  const handleSearch = () => { 
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      router.push(`/items?search=${encodeURIComponent(trimmedQuery)}`);
    } 
  };

  return (
      <div className={styles.SearchBox}>
        <div className={styles.SearchBoxContainer}>
          <Image className={styles.logo} src='/Logo_ML.png' width={53} height={36} alt='Logo Mercado Livre'/> 
          <input
            className={styles.SearchInput} 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Nunca dejes de buscar"
          />
          <button onClick={handleSearch} className={styles.SearchButton}>
            <Image src="/ic_Search.png" width={18} height={18} alt="Search"/>
          </button>
        </div>
      </div>
  );
};


export default SearchBox;