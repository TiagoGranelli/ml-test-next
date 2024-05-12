"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

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
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Digite o nome do produto"
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};


export default SearchBox;