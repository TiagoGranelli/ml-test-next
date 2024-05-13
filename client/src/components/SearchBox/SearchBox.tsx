"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import styles from "./SearchBox.module.scss";
import Image from 'next/image';
import Link from 'next/link';

const SearchBox: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter(); 
 
  const handleSearch = (event:any) => { 
    event.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      router.push(`/items?search=${encodeURIComponent(trimmedQuery)}`);
    } 
  };

  return (
    <form onSubmit={handleSearch} className={styles.SearchBox}>
      <div className={styles.SearchBoxContainer}>
        <Link href="/"> 
          <Image className={styles.logo} src='/Logo_ML.png' width={53} height={36} alt='Logo Mercado Livre'/>
        </Link>
        <input
          className={styles.SearchInput}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Nunca dejes de buscar"
        />
        <button type="submit" className={styles.SearchButton}>
          <Image src="/ic_Search.png" width={18} height={18} alt="Search"/>
        </button>
      </div>
    </form>
  );
};


export default SearchBox;