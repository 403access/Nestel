import { Filters } from "@/components/filters"
import { ProductCard } from "@/components/product-card"
import { SearchBar } from "@/components/search-bar"
import type { Allergen } from "@/data/allergens"
import * as Allergens from "@/data/allergens"
import type { Category } from "@/data/categories"
import * as Categories from "@/data/categories"
import type { Ingredient } from "@/data/ingredients"
import * as Ingredients from "@/data/ingredients"
import { mockBreadProducts } from "@/data/products"
import { useProductSearch } from "@/hooks/use-product-search"
import React from "react"
import { FlatList, StyleSheet, View } from "react-native"

const allIngredients = Object.values(Ingredients).filter(
  (v) => typeof v === "string"
) as Ingredient[]
const allAllergens = Object.values(Allergens).filter(
  (v) => typeof v === "string"
) as Allergen[]
const allCategories = Object.values(Categories).filter(
  (v) => typeof v === "string"
) as Category[]

export default function ProductsScreen() {
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

  const toggleIngredient = (ingredient: Ingredient) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient]
    )
  }

  const toggleAllergen = (allergen: Allergen) => {
    setSelectedAllergens((prev) =>
      prev.includes(allergen)
        ? prev.filter((a) => a !== allergen)
        : [...prev, allergen]
    )
  }

  const toggleCategory = (category: Category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    )
  }

  return (
    <View style={styles.container}>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Filters
        allIngredients={allIngredients}
        allAllergens={allAllergens}
        allCategories={allCategories}
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
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
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
