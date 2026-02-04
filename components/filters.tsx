import type { Allergen } from "@/data/allergens"
import type { Category } from "@/data/categories"
import type { Ingredient } from "@/data/ingredients"
import React from "react"
import { FilterGroup } from "./filter-group"

interface FiltersProps {
  allIngredients: Ingredient[]
  allAllergens: Allergen[]
  allCategories: Category[]
  allDoughIngredients: Ingredient[] // New prop
  allDairyIngredients: Ingredient[] // New prop
  selectedIngredients: number[]
  selectedAllergens: number[]
  selectedCategories: number[]
  selectedDoughTypes: number[] // New prop
  selectedDairyProducts: number[] // New prop
  toggleIngredient: (ingredientId: number) => void
  toggleAllergen: (allergenId: number) => void
  toggleCategory: (categoryId: number) => void
  toggleDoughType: (ingredientId: number) => void // New prop
  toggleDairyProduct: (ingredientId: number) => void // New prop
}

export function Filters({
  allIngredients,
  allAllergens,
  allCategories,
  allDoughIngredients, // Destructure new prop
  allDairyIngredients, // Destructure new prop
  selectedIngredients,
  selectedAllergens,
  selectedCategories,
  selectedDoughTypes, // Destructure new prop
  selectedDairyProducts, // Destructure new prop
  toggleIngredient,
  toggleAllergen,
  toggleCategory,
  toggleDoughType, // Destructure new prop
  toggleDairyProduct // Destructure new prop
}: FiltersProps) {
  return (
    <>
      <FilterGroup
        title="Categories"
        items={allCategories}
        selectedItems={selectedCategories}
        toggleItem={toggleCategory}
      />
      <FilterGroup
        title="Ingredients"
        items={allIngredients}
        selectedItems={selectedIngredients}
        toggleItem={toggleIngredient}
      />
      <FilterGroup
        title="Allergens"
        items={allAllergens}
        selectedItems={selectedAllergens}
        toggleItem={toggleAllergen}
      />
      <FilterGroup // New FilterGroup for Dough Types
        title="Dough Types"
        items={allDoughIngredients}
        selectedItems={selectedDoughTypes}
        toggleItem={toggleDoughType}
      />
      <FilterGroup // New FilterGroup for Dairy Products
        title="Dairy Products"
        items={allDairyIngredients}
        selectedItems={selectedDairyProducts}
        toggleItem={toggleDairyProduct}
      />
    </>
  )
}
