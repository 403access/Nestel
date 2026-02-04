import type { Allergen } from "@/data/allergens"
import type { Category } from "@/data/categories"
import type { Ingredient } from "@/data/ingredients"
import React from "react"
import { FilterGroup } from "./filter-group"

interface FiltersProps {
  allIngredients: Ingredient[]
  allAllergens: Allergen[]
  allCategories: Category[]
  selectedIngredients: Ingredient[]
  selectedAllergens: Allergen[]
  selectedCategories: Category[]
  toggleIngredient: (ingredient: Ingredient) => void
  toggleAllergen: (allergen: Allergen) => void
  toggleCategory: (category: Category) => void
}

export function Filters({
  allIngredients,
  allAllergens,
  allCategories,
  selectedIngredients,
  selectedAllergens,
  selectedCategories,
  toggleIngredient,
  toggleAllergen,
  toggleCategory
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
    </>
  )
}
