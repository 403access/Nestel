import type { Allergen } from "@/data/allergens"
import type { Category } from "@/data/categories"
import type { Ingredient } from "@/data/ingredients"
import type { Menu } from "@/data/menus"
import React from "react"
import { FilterGroup } from "./filter-group"

interface FiltersProps {
  allIngredients: Ingredient[]
  allAllergens: Allergen[]
  allCategories: Category[]
  allDoughIngredients: Ingredient[]
  allDairyIngredients: Ingredient[]
  allMenus: Menu[]
  selectedIngredients: number[]
  selectedAllergens: number[]
  selectedCategories: number[]
  selectedDoughTypes: number[]
  selectedDairyProducts: number[]
  selectedMenus: number[]
  toggleIngredient: (ingredientId: number) => void
  toggleAllergen: (allergenId: number) => void
  toggleCategory: (categoryId: number) => void
  toggleDoughType: (ingredientId: number) => void
  toggleDairyProduct: (ingredientId: number) => void
  toggleMenu: (menuId: number) => void
  availableIngredientIds: Set<number>
  availableIngredientTypes: Set<"dough" | "dairy" | "other">
  selectedCategoryObjects: Category[]
}

export function Filters({
  allIngredients,
  allAllergens,
  allCategories,
  allDoughIngredients,
  allDairyIngredients,
  allMenus,
  selectedIngredients,
  selectedAllergens,
  selectedCategories,
  selectedDoughTypes,
  selectedDairyProducts,
  selectedMenus,
  toggleIngredient,
  toggleAllergen,
  toggleCategory,
  toggleDoughType,
  toggleDairyProduct,
  toggleMenu,
  availableIngredientIds,
  availableIngredientTypes,
  selectedCategoryObjects
}: FiltersProps) {
  const isDoughFilterGroupDisabled =
    selectedCategoryObjects.length > 0 && !availableIngredientTypes.has("dough")
  const isDairyFilterGroupDisabled =
    selectedCategoryObjects.length > 0 && !availableIngredientTypes.has("dairy")

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
        availableItemIds={availableIngredientIds}
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
        availableItemIds={availableIngredientIds}
        isDisabled={isDoughFilterGroupDisabled}
      />
      <FilterGroup
        title="Dairy Products"
        items={allDairyIngredients}
        selectedItems={selectedDairyProducts}
        toggleItem={toggleDairyProduct}
        availableItemIds={availableIngredientIds}
        isDisabled={isDairyFilterGroupDisabled}
      />
      <FilterGroup
        title="Menus"
        items={allMenus}
        selectedItems={selectedMenus}
        toggleItem={toggleMenu}
      />
    </>
  )
}
