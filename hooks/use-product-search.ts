import { useState, useMemo, useEffect } from "react"
import { ALL_INGREDIENTS, Ingredient } from "@/data/ingredients"
import type { BreadProduct } from "@/data/products"
import { ALL_CATEGORIES, Category } from "@/data/categories"
import { ALL_MENUS, Menu } from "@/data/menus" // Import ALL_MENUS and Menu

export function useProductSearch(products: BreadProduct[]) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedIngredients, setSelectedIngredients] = useState<number[]>([])
  const [selectedAllergens, setSelectedAllergens] = useState<number[]>([])
  const [selectedCategories, setSelectedCategories] = useState<number[]>([])
  const [selectedDoughTypes, setSelectedDoughTypes] = useState<number[]>([])
  const [selectedDairyProducts, setSelectedDairyProducts] = useState<number[]>(
    []
  )
  const [selectedMenus, setSelectedMenus] = useState<number[]>([]) // New state for selected menus

  const { availableIngredientIds, availableIngredientTypes } = useMemo(() => {
    if (selectedCategories.length === 0) {
      return {
        availableIngredientIds: new Set(ALL_INGREDIENTS.map((ing) => ing.id)),
        availableIngredientTypes: new Set(["dough", "dairy", "other"] as const)
      }
    }

    const currentCategories = ALL_CATEGORIES.filter((cat) =>
      selectedCategories.includes(cat.id)
    )
    const allowedIds = new Set<number>()
    const allowedTypes = new Set<"dough" | "dairy" | "other">()

    currentCategories.forEach((cat) => {
      if (cat.allowedIngredientIds) {
        cat.allowedIngredientIds.forEach((id) => allowedIds.add(id))
      }
      if (cat.allowedIngredientTypes) {
        cat.allowedIngredientTypes.forEach((type) => allowedTypes.add(type))
      }
    })

    return {
      availableIngredientIds: allowedIds,
      availableIngredientTypes: allowedTypes
    }
  }, [selectedCategories])

  // Effect to deselect ingredients that are no longer available
  useEffect(() => {
    setSelectedIngredients((prev) =>
      prev.filter((id) => availableIngredientIds.has(id))
    )
  }, [availableIngredientIds])

  // Effect to deselect dough types that are no longer available
  useEffect(() => {
    setSelectedDoughTypes((prev) =>
      prev.filter((id) => availableIngredientIds.has(id))
    )
  }, [availableIngredientIds])

  // Effect to deselect dairy products that are no longer available
  useEffect(() => {
    setSelectedDairyProducts((prev) =>
      prev.filter((id) => availableIngredientIds.has(id))
    )
  }, [availableIngredientIds])

  // Effect to deselect menus that are no longer valid (e.g., if ALL_MENUS data changes)
  useEffect(() => {
    setSelectedMenus((prev) =>
      prev.filter((id) => ALL_MENUS.some((menu) => menu.id === id))
    )
  }, []) // Run once on mount or if ALL_MENUS changes (though it's a constant)

  // Return ALL_INGREDIENTS with dough/dairy removed, without considering category availability
  const filteredAllIngredients = useMemo(() => {
    const doughTypeIds = ALL_INGREDIENTS.filter(
      (ing) => ing.type === "dough"
    ).map((ing) => ing.id)
    const dairyTypeIds = ALL_INGREDIENTS.filter(
      (ing) => ing.type === "dairy"
    ).map((ing) => ing.id)

    return ALL_INGREDIENTS.filter(
      (ingredient) =>
        !doughTypeIds.includes(ingredient.id) &&
        !dairyTypeIds.includes(ingredient.id)
    )
  }, [])

  // Return ALL_INGREDIENTS of type 'dough', without considering category availability
  const filteredDoughIngredients = useMemo(() => {
    return ALL_INGREDIENTS.filter((ing) => ing.type === "dough")
  }, [])

  // Return ALL_INGREDIENTS of type 'dairy', without considering category availability
  const filteredDairyIngredients = useMemo(() => {
    return ALL_INGREDIENTS.filter((ing) => ing.type === "dairy")
  }, [])

  const toggleDoughType = (doughTypeId: number) => {
    if (availableIngredientIds.has(doughTypeId)) {
      setSelectedDoughTypes((prev) =>
        prev.includes(doughTypeId)
          ? prev.filter((id) => id !== doughTypeId)
          : [...prev, doughTypeId]
      )
    }
  }

  const toggleDairyProduct = (dairyProductId: number) => {
    if (availableIngredientIds.has(dairyProductId)) {
      setSelectedDairyProducts((prev) =>
        prev.includes(dairyProductId)
          ? prev.filter((id) => id !== dairyProductId)
          : [...prev, dairyProductId]
      )
    }
  }

  const toggleMenu = (menuId: number) => {
    setSelectedMenus((prev) =>
      prev.includes(menuId)
        ? prev.filter((id) => id !== menuId)
        : [...prev, menuId]
    )
  }

  const filteredProducts = products.filter((product) => {
    const searchTerm = searchQuery.toLowerCase()
    const productName = product.name.toLowerCase()
    const productIngredientNames = product.ingredients
      .map((id) => ALL_INGREDIENTS.find((ing) => ing.id === id)?.name || "")
      .join(", ")
      .toLowerCase()
    const textMatch =
      productName.includes(searchTerm) ||
      productIngredientNames.includes(searchTerm)

    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category)

    const ingredientMatch =
      selectedIngredients.length === 0 ||
      selectedIngredients.every(
        (selectedId) =>
          product.ingredients.includes(selectedId) &&
          availableIngredientIds.has(selectedId)
      )

    const doughTypeMatch =
      selectedDoughTypes.length === 0 ||
      selectedDoughTypes.every(
        (selectedId) =>
          product.ingredients.includes(selectedId) &&
          availableIngredientIds.has(selectedId)
      )

    const dairyProductMatch =
      selectedDairyProducts.length === 0 ||
      selectedDairyProducts.every(
        (selectedId) =>
          product.ingredients.includes(selectedId) &&
          availableIngredientIds.has(selectedId)
      )

    const allergenMatch =
      selectedAllergens.length === 0 ||
      selectedAllergens.every((selectedId) =>
        product.allergens.includes(selectedId)
      )

    // New Menu filter
    const menuMatch =
      selectedMenus.length === 0 ||
      selectedMenus.some((selectedId) => product.menuIds?.includes(selectedId))

    return (
      textMatch &&
      ingredientMatch &&
      allergenMatch &&
      categoryMatch &&
      doughTypeMatch &&
      dairyProductMatch &&
      menuMatch
    )
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
    setSelectedDoughTypes,
    selectedDairyProducts,
    setSelectedDairyProducts,
    selectedMenus,
    setSelectedMenus,
    toggleIngredient: (ingredientId: number) => {
      if (availableIngredientIds.has(ingredientId)) {
        setSelectedIngredients((prev) =>
          prev.includes(ingredientId)
            ? prev.filter((id) => id !== ingredientId)
            : [...prev, ingredientId]
        )
      } else {
        setSelectedIngredients((prev) =>
          prev.filter((id) => id !== ingredientId)
        )
      }
    },
    toggleDoughType,
    toggleDairyProduct,
    toggleMenu, // Expose toggleMenu
    filteredAllIngredients,
    filteredDoughIngredients,
    filteredDairyIngredients,
    availableIngredientIds,
    availableIngredientTypes,
    selectedCategoryObjects: ALL_CATEGORIES.filter((cat) =>
      selectedCategories.includes(cat.id)
    ),
    ALL_MENUS // Expose ALL_MENUS for the UI
  }
}
