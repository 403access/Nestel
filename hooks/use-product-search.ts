import { useState, useMemo, useEffect } from "react"
import { ALL_INGREDIENTS, Ingredient } from "@/data/ingredients"
import type { BreadProduct } from "@/data/products"
import { ALL_CATEGORIES, Category } from "@/data/categories";

export function useProductSearch(products: BreadProduct[]) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedIngredients, setSelectedIngredients] = useState<number[]>([])
  const [selectedAllergens, setSelectedAllergens] = useState<number[]>([])
  const [selectedCategories, setSelectedCategories] = useState<number[]>([])
  const [selectedDoughTypes, setSelectedDoughTypes] = useState<number[]>([])
  const [selectedDairyProducts, setSelectedDairyProducts] = useState<number[]>([])

  const { availableIngredientIds, availableIngredientTypes } = useMemo(() => {
    if (selectedCategories.length === 0) {
      return {
        availableIngredientIds: new Set(ALL_INGREDIENTS.map(ing => ing.id)),
        availableIngredientTypes: new Set(['dough', 'dairy', 'other'] as const),
      };
    }

    const currentCategories = ALL_CATEGORIES.filter(cat => selectedCategories.includes(cat.id));
    const allowedIds = new Set<number>();
    const allowedTypes = new Set<'dough' | 'dairy' | 'other'>();

    currentCategories.forEach(cat => {
      if (cat.allowedIngredientIds) {
        cat.allowedIngredientIds.forEach(id => allowedIds.add(id));
      }
      if (cat.allowedIngredientTypes) {
        cat.allowedIngredientTypes.forEach(type => allowedTypes.add(type));
      }
    });

    return { availableIngredientIds: allowedIds, availableIngredientTypes: allowedTypes };
  }, [selectedCategories]);

  // Effect to deselect ingredients that are no longer available
  useEffect(() => {
    setSelectedIngredients(prev =>
      prev.filter(id => availableIngredientIds.has(id))
    );
  }, [availableIngredientIds]); // Only re-run if availableIngredientIds changes

  // Effect to deselect dough types that are no longer available
  useEffect(() => {
    setSelectedDoughTypes(prev =>
      prev.filter(id => availableIngredientIds.has(id))
    );
  }, [availableIngredientIds]);

  // Effect to deselect dairy products that are no longer available
  useEffect(() => {
    setSelectedDairyProducts(prev =>
      prev.filter(id => availableIngredientIds.has(id))
    );
  }, [availableIngredientIds]);

  // Return ALL_INGREDIENTS with dough/dairy removed, without considering category availability
  const filteredAllIngredients = useMemo(() => {
    const doughTypeIds = ALL_INGREDIENTS.filter(ing => ing.type === 'dough').map(ing => ing.id);
    const dairyTypeIds = ALL_INGREDIENTS.filter(ing => ing.type === 'dairy').map(ing => ing.id);

    return ALL_INGREDIENTS.filter(
      (ingredient) =>
        !doughTypeIds.includes(ingredient.id) &&
        !dairyTypeIds.includes(ingredient.id)
    );
  }, []); // No dependency on availableIngredientIds here

  // Return ALL_INGREDIENTS of type 'dough', without considering category availability
  const filteredDoughIngredients = useMemo(() => {
    return ALL_INGREDIENTS.filter(
      (ing) => ing.type === 'dough'
    );
  }, []); // No dependency on availableIngredientIds here

  // Return ALL_INGREDIENTS of type 'dairy', without considering category availability
  const filteredDairyIngredients = useMemo(() => {
    return ALL_INGREDIENTS.filter(
      (ing) => ing.type === 'dairy'
    );
  }, []); // No dependency on availableIngredientIds here


  const toggleDoughType = (doughTypeId: number) => {
    // Only allow toggling if the ingredient is available
    if (availableIngredientIds.has(doughTypeId)) {
      setSelectedDoughTypes((prev) =>
        prev.includes(doughTypeId)
          ? prev.filter((id) => id !== doughTypeId)
          : [...prev, doughTypeId]
      );
    }
  };

  const toggleDairyProduct = (dairyProductId: number) => {
    // Only allow toggling if the ingredient is available
    if (availableIngredientIds.has(dairyProductId)) {
      setSelectedDairyProducts((prev) =>
        prev.includes(dairyProductId)
          ? prev.filter((id) => id !== dairyProductId)
          : [...prev, dairyProductId]
      );
    }
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

    // Category filter - products must be in selected categories
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category)

    // Ingredient filter - product must have ALL selected ingredients and they must be available
    const ingredientMatch =
      selectedIngredients.length === 0 ||
      selectedIngredients.every((selectedId) =>
        product.ingredients.includes(selectedId) && availableIngredientIds.has(selectedId)
      )

    // Dough type filter - product must have ALL selected dough types and they must be available
    const doughTypeMatch =
      selectedDoughTypes.length === 0 ||
      selectedDoughTypes.every((selectedId) =>
        product.ingredients.includes(selectedId) && availableIngredientIds.has(selectedId)
      );

    // Dairy product filter - product must have ALL selected dairy products and they must be available
    const dairyProductMatch =
      selectedDairyProducts.length === 0 ||
      selectedDairyProducts.every((selectedId) =>
        product.ingredients.includes(selectedId) && availableIngredientIds.has(selectedId)
      );

    // Allergen filter - this remains unchanged as allergens are independent of categories
    const allergenMatch =
      selectedAllergens.length === 0 ||
      selectedAllergens.every((selectedId) =>
        product.allergens.includes(selectedId)
      )

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
    setSelectedDoughTypes, // Also expose setter for clearing if needed
    selectedDairyProducts,
    setSelectedDairyProducts, // Also expose setter for clearing if needed
    toggleIngredient: (ingredientId: number) => { // Wrap original toggle to respect availability
        if (availableIngredientIds.has(ingredientId)) {
            setSelectedIngredients((prev) =>
                prev.includes(ingredientId)
                    ? prev.filter((id) => id !== ingredientId)
                    : [...prev, ingredientId]
            );
        } else {
            // If the ingredient is not available, ensure it's not selected
            setSelectedIngredients((prev) => prev.filter((id) => id !== ingredientId));
        }
    },
    toggleDoughType,
    toggleDairyProduct,
    filteredAllIngredients,
    filteredDoughIngredients,
    filteredDairyIngredients,
    availableIngredientIds, // Expose for UI to disable items
    availableIngredientTypes, // Expose for UI to disable entire groups or types
    selectedCategoryObjects: ALL_CATEGORIES.filter(cat => selectedCategories.includes(cat.id)), // Expose selected category objects
  }
}
