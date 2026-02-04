import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { mockBreadProducts } from '@/data/products';
import { ProductCard } from '@/components/product-card';
import { useProductSearch } from '@/hooks/use-product-search';
import * as Ingredients from '@/data/ingredients';
import * as Allergens from '@/data/allergens';
import { Ingredient } from '@/data/ingredients';
import { Allergen } from '@/data/allergens';
import { Filters } from '@/components/filters';
import { SearchBar } from '@/components/search-bar';

const allIngredients = Object.values(Ingredients).filter(
  (v) => typeof v === 'string'
) as Ingredient[];
const allAllergens = Object.values(Allergens).filter(
  (v) => typeof v === 'string'
) as Allergen[];

export default function ProductsScreen() {
  const {
    searchQuery,
    setSearchQuery,
    filteredProducts,
    selectedIngredients,
    setSelectedIngredients,
    selectedAllergens,
    setSelectedAllergens,
  } = useProductSearch(mockBreadProducts);

  const toggleIngredient = (ingredient: Ingredient) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const toggleAllergen = (allergen: Allergen) => {
    setSelectedAllergens((prev) =>
      prev.includes(allergen)
        ? prev.filter((a) => a !== allergen)
        : [...prev, allergen]
    );
  };

  return (
    <View style={styles.container}>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Filters
        allIngredients={allIngredients}
        allAllergens={allAllergens}
        selectedIngredients={selectedIngredients}
        selectedAllergens={selectedAllergens}
        toggleIngredient={toggleIngredient}
        toggleAllergen={toggleAllergen}
      />
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#f0f0f0',
  },
  listContent: {
    paddingHorizontal: 10,
  },
});