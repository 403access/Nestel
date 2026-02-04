import type { Allergen } from "@/data/allergens"
import type { Category } from "@/data/categories"
import type { Ingredient } from "@/data/ingredients"
import type { BreadProduct } from "@/data/products"
import { useState } from "react"

export function useProductSearch(products: BreadProduct[]) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
    []
  )
  const [selectedAllergens, setSelectedAllergens] = useState<Allergen[]>([])
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])

  const filteredProducts = products.filter((product) => {
    // Text search
    const searchTerm = searchQuery.toLowerCase()
    const productName = product.name.toLowerCase()
    const productIngredients = product.ingredients.join(", ").toLowerCase()
    const textMatch =
      productName.includes(searchTerm) ||
      productIngredients.includes(searchTerm)

    // Ingredient filter
    const ingredientMatch =
      selectedIngredients.length === 0 ||
      selectedIngredients.every((ingredient) =>
        product.ingredients.includes(ingredient)
      )

    // Allergen filter
    const allergenMatch =
      selectedAllergens.length === 0 ||
      selectedAllergens.every((allergen) =>
        product.allergens.includes(allergen)
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
