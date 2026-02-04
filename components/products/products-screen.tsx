import React, { useState } from "react"
import { FlatList, StyleSheet, View, Pressable } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Filters } from "@/components/filters"
import { ProductCard } from "@/components/product-card"
import { SearchBar } from "@/components/search-bar"
import { ALL_ALLERGENS } from "@/data/allergens"
import { ALL_CATEGORIES } from "@/data/categories"
import { ALL_INGREDIENTS } from "@/data/ingredients"
import { mockBreadProducts } from "@/data/products"
import { useProductSearch } from "@/hooks/use-product-search"

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
    setSelectedCategories,
    selectedDoughTypes,
    toggleDoughType,
    selectedDairyProducts,
    toggleDairyProduct,
    ALL_DOUGH_INGREDIENTS,
    ALL_DAIRY_INGREDIENTS,
  } = useProductSearch(mockBreadProducts)

  const filteredAllIngredients = ALL_INGREDIENTS.filter(
    (ingredient) => ingredient.type !== 'dough' && ingredient.type !== 'dairy'
  );

  const [showFilters, setShowFilters] = useState(false);


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
      <View style={styles.headerContainer}>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} style={styles.searchBar} />
        <Pressable onPress={() => setShowFilters(prev => !prev)} style={styles.filterButton}>
          <Ionicons name={showFilters ? "options" : "options-outline"} size={24} color="black" />
        </Pressable>
      </View>
      {showFilters && (
        <Filters
          allIngredients={filteredAllIngredients}
          allAllergens={ALL_ALLERGENS}
          allCategories={ALL_CATEGORIES}
          allDoughIngredients={ALL_DOUGH_INGREDIENTS}
          allDairyIngredients={ALL_DAIRY_INGREDIENTS}
          selectedIngredients={selectedIngredients}
          selectedAllergens={selectedAllergens}
          selectedCategories={selectedCategories}
          selectedDoughTypes={selectedDoughTypes}
          selectedDairyProducts={selectedDairyProducts}
          toggleIngredient={toggleIngredient}
          toggleAllergen={toggleAllergen}
          toggleCategory={toggleCategory}
          toggleDoughType={toggleDoughType}
          toggleDairyProduct={toggleDairyProduct}
        />
      )}
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: 10, // Re-added margin
    paddingRight: 10
  },
  filterButton: {
    marginLeft: 10,
    padding: 8,
  },
  listContent: {
    paddingHorizontal: 10
  },
  searchBar: {
    flex: 1,
  }
})
