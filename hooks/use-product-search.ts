import { useState } from 'react';
import { BreadProduct } from '@/data/products';

export function useProductSearch(products: BreadProduct[]) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter((product) => {
    const searchTerm = searchQuery.toLowerCase();
    const productName = product.name.toLowerCase();
    const productIngredients = product.ingredients.toLowerCase();

    return productName.includes(searchTerm) || productIngredients.includes(searchTerm);
  });

  return { searchQuery, setSearchQuery, filteredProducts };
}
