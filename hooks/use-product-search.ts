import { useState } from "react"
import { BreadProduct } from "@/data/products"
import { Ingredient } from "@/data/ingredients"
import { Allergen } from "@/data/allergens"

export function useProductSearch(products: BreadProduct[]) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
    []
  )
  const [selectedAllergens, setSelectedAllergens] = useState<Allergen[]>([])

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

    return textMatch && ingredientMatch && allergenMatch
  })

  return {
    searchQuery,
    setSearchQuery,
    filteredProducts,
    selectedIngredients,
    setSelectedIngredients,
    selectedAllergens,
    setSelectedAllergens
  }
}
