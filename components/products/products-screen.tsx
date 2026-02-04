import { Filters } from "@/components/filters"
import { ProductCard } from "@/components/product-card"
import { SearchBar } from "@/components/search-bar"
import { ALL_ALLERGENS } from "@/data/allergens"
import { ALL_CATEGORIES } from "@/data/categories"
import { ALL_INGREDIENTS } from "@/data/ingredients"
import { mockBreadProducts } from "@/data/products"
import { useProductSearch } from "@/hooks/use-product-search"
import React from "react"
import { FlatList, StyleSheet, View } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context';

export function ProductsScreen() {
  const {
    searchQuery,
    setSearchQuery,
    filteredProducts,
    selectedIngredients,
    setSelectedIngredients,
    selectedAllergens,
    setSelectedAllergens,
    selectedCategories,
    setSelectedCategories
  } = useProductSearch(mockBreadProducts)

  const toggleIngredient = (ingredientId: number) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredientId)
        ? prev.filter((id) => id !== ingredientId)
        : [...prev, ingredientId]
    )
  }

  const toggleAllergen = (allergenId: number) => {
    setSelectedAllergens((prev) =>
      prev.includes(allergenId)
        ? prev.filter((id) => id !== allergenId)
        : [...prev, allergenId]
    )
  }

  const toggleCategory = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Filters
        allIngredients={ALL_INGREDIENTS}
        allAllergens={ALL_ALLERGENS}
        allCategories={ALL_CATEGORIES}
        selectedIngredients={selectedIngredients}
        selectedAllergens={selectedAllergens}
        selectedCategories={selectedCategories}
        toggleIngredient={toggleIngredient}
        toggleAllergen={toggleAllergen}
        toggleCategory={toggleCategory}
      />
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => item.id.toString()} // Ensure key is string
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#f0f0f0"
  },
  listContent: {
    paddingHorizontal: 10
  }
})
