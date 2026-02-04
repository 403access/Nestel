import { useState } from "react"
import { ALL_INGREDIENTS } from "@/data/ingredients"
import type { BreadProduct } from "@/data/products"

export function useProductSearch(products: BreadProduct[]) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedIngredients, setSelectedIngredients] = useState<number[]>([])
  const [selectedAllergens, setSelectedAllergens] = useState<number[]>([])
  const [selectedCategories, setSelectedCategories] = useState<number[]>([])

  const filteredProducts = products.filter((product) => {
    // Text search
    const searchTerm = searchQuery.toLowerCase()
    const productName = product.name.toLowerCase()
    const productIngredientNames = product.ingredients
      .map((id) => ALL_INGREDIENTS.find((ing) => ing.id === id)?.name || "")
      .join(", ")
      .toLowerCase()
    const textMatch =
      productName.includes(searchTerm) ||
      productIngredientNames.includes(searchTerm)

    // Ingredient filter
    const ingredientMatch =
      selectedIngredients.length === 0 ||
      selectedIngredients.every((selectedId) =>
        product.ingredients.includes(selectedId)
      )

    // Allergen filter
    const allergenMatch =
      selectedAllergens.length === 0 ||
      selectedAllergens.every((selectedId) =>
        product.allergens.includes(selectedId)
      )

    // Category filter
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category)

    return textMatch && ingredientMatch && allergenMatch && categoryMatch
  })

  return {
    searchQuery,
    setSearchQuery,
    filteredProducts,
    selectedIngredients,
    setSelectedIngredients,
    selectedAllergens,
    setSelectedAllergens,
    selectedCategories,
    setSelectedCategories
  }
}
