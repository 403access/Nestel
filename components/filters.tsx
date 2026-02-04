import type { Allergen } from "@/data/allergens"
import type { Category } from "@/data/categories"
import type { Ingredient } from "@/data/ingredients"
import React from "react"
import { FilterGroup } from "./filter-group"

interface FiltersProps {
  allIngredients: Ingredient[] // These are now already filtered by useProductSearch
  allAllergens: Allergen[]
  allCategories: Category[]
  allDoughIngredients: Ingredient[] // These are now already filtered by useProductSearch
  allDairyIngredients: Ingredient[] // These are now already filtered by useProductSearch
  selectedIngredients: number[]
  selectedAllergens: number[]
  selectedCategories: number[]
  selectedDoughTypes: number[]
  selectedDairyProducts: number[]
  toggleIngredient: (ingredientId: number) => void
  toggleAllergen: (allergenId: number) => void
  toggleCategory: (categoryId: number) => void
  toggleDoughType: (ingredientId: number) => void
  toggleDairyProduct: (ingredientId: number) => void
  availableIngredientIds: Set<number>; // New prop for disabling individual items
  availableIngredientTypes: Set<'dough' | 'dairy' | 'other'>; // New prop for disabling entire groups
  selectedCategoryObjects: Category[]; // New prop to pass selected category objects
}

export function Filters({
  allIngredients,
  allAllergens,
  allCategories,
  allDoughIngredients,
  allDairyIngredients,
  selectedIngredients,
  selectedAllergens,
  selectedCategories,
  selectedDoughTypes,
  selectedDairyProducts,
  toggleIngredient,
  toggleAllergen,
  toggleCategory,
  toggleDoughType,
  toggleDairyProduct,
  availableIngredientIds,
  availableIngredientTypes,
  selectedCategoryObjects,
}: FiltersProps) {
  // Determine if Dough Types filter group should be disabled
  const isDoughFilterGroupDisabled = selectedCategoryObjects.length > 0 && !availableIngredientTypes.has('dough');
  // Determine if Dairy Products filter group should be disabled
  const isDairyFilterGroupDisabled = selectedCategoryObjects.length > 0 && !availableIngredientTypes.has('dairy');

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
        availableItemIds={availableIngredientIds} // Pass for individual item disabling
      />
      <FilterGroup
        title="Allergens"
        items={allAllergens}
        selectedItems={selectedAllergens}
        toggleItem={toggleAllergen}
      />
      <FilterGroup
        title="Dough Types"
        items={allDoughIngredients}
        selectedItems={selectedDoughTypes}
        toggleItem={toggleDoughType}
        availableItemIds={availableIngredientIds} // Pass for individual item disabling
        isDisabled={isDoughFilterGroupDisabled}
      />
      <FilterGroup
        title="Dairy Products"
        items={allDairyIngredients}
        selectedItems={selectedDairyProducts}
        toggleItem={toggleDairyProduct}
        availableItemIds={availableIngredientIds} // Pass for individual item disabling
        isDisabled={isDairyFilterGroupDisabled}
      />
    </>
  )
}
