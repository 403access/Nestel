import { useState } from "react"
import { ALL_INGREDIENTS, Ingredient } from "@/data/ingredients"
import type { BreadProduct } from "@/data/products"

export function useProductSearch(products: BreadProduct[]) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedIngredients, setSelectedIngredients] = useState<number[]>([])
  const [selectedAllergens, setSelectedAllergens] = useState<number[]>([])
  const [selectedCategories, setSelectedCategories] = useState<number[]>([])
  const [selectedDoughTypes, setSelectedDoughTypes] = useState<number[]>([])
  const [selectedDairyProducts, setSelectedDairyProducts] = useState<number[]>([])

  const ALL_DOUGH_INGREDIENTS = ALL_INGREDIENTS.filter(ing => ing.type === 'dough');
  const ALL_DAIRY_INGREDIENTS = ALL_INGREDIENTS.filter(ing => ing.type === 'dairy');

  const toggleDoughType = (doughTypeId: number) => {
    setSelectedDoughTypes((prev) =>
      prev.includes(doughTypeId)
        ? prev.filter((id) => id !== doughTypeId)
        : [...prev, doughTypeId]
    );
  };

  const toggleDairyProduct = (dairyProductId: number) => {
    setSelectedDairyProducts((prev) =>
      prev.includes(dairyProductId)
        ? prev.filter((id) => id !== dairyProductId)
        : [...prev, dairyProductId]
    );
  };

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

    // Dough type filter
    const doughTypeMatch =
      selectedDoughTypes.length === 0 ||
      selectedDoughTypes.every((selectedId) =>
        product.ingredients.includes(selectedId)
      );

    // Dairy product filter
    const dairyProductMatch =
      selectedDairyProducts.length === 0 ||
      selectedDairyProducts.every((selectedId) =>
        product.ingredients.includes(selectedId)
      );

    return textMatch && ingredientMatch && allergenMatch && categoryMatch && doughTypeMatch && dairyProductMatch
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
    setSelectedCategories,
    selectedDoughTypes,
    toggleDoughType,
    selectedDairyProducts,
    toggleDairyProduct,
    ALL_DOUGH_INGREDIENTS,
    ALL_DAIRY_INGREDIENTS,
  }
}
