import React, { useState } from "react"
import { FlatList, StyleSheet, View, Pressable } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Filters } from "@/components/filters"
import { ProductCard } from "@/components/product-card"
import { SearchBar } from "@/components/search-bar"
import { ALL_ALLERGENS } from "@/data/allergens"
import { ALL_CATEGORIES } from "@/data/categories"
import { ALL_INGREDIENTS } from "@/data/ingredients"
import { mockBreadProducts } from "@/data/products"
import { useProductSearch } from "@/hooks/use-product-search"

export function ProductsScreen() {
  const {
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
    filteredAllIngredients: hookFilteredAllIngredients, // Rename to avoid conflict with local variable
    filteredDoughIngredients,
    filteredDairyIngredients,
    availableIngredientIds,
    availableIngredientTypes,
    selectedCategoryObjects,
    selectedMenus,
    setSelectedMenus,
    toggleMenu,
    ALL_MENUS,
  } = useProductSearch(mockBreadProducts)

  const [showFilters, setShowFilters] = useState(false);

  // Helper function to calculate price based on selected menus
  const getPriceInfo = (product: typeof filteredProducts[0]) => {
    let currentPrice = product.price;
    const originalPrice = product.price;

    if (selectedMenus.length > 0 && product.menuIds && product.menuIds.length > 0) {
      // Find the best discount from selected menus
      for (const menuId of selectedMenus) {
        const menu = ALL_MENUS.find(m => m.id === menuId);
        if (menu && menu.offers) { // Check for offers array
          for (const offer of menu.offers) { // Iterate through offers
            const menuItem = offer.items.find(item => item.productId === product.id);
            if (menuItem && menuItem.discountPrice !== undefined) {
              currentPrice = Math.min(currentPrice, menuItem.discountPrice);
            }
          }
        }
      }
    }
    return { currentPrice, originalPrice };
  };

  const toggleIngredient = (ingredientId: number) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredientId)
        ? prev.filter((id) => id !== ingredientId)
        : [...prev, ingredientId]
    )
  }

  const toggleAllergen = (allergenId: number) => {
    setSelectedAllergens((prev) =>
      prev.includes(allergenId)
        ? prev.filter((id) => id !== allergenId)
        : [...prev, allergenId]
    )
  }

  const toggleCategory = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} style={styles.searchBar} />
        <Pressable onPress={() => setShowFilters(prev => !prev)} style={styles.filterButton}>
          <Ionicons name={showFilters ? "options" : "options-outline"} size={24} color="black" />
        </Pressable>
      </View>
      {showFilters && (
        <Filters
          allIngredients={hookFilteredAllIngredients}
          allAllergens={ALL_ALLERGENS}
          allCategories={ALL_CATEGORIES} // Keep ALL_CATEGORIES as the items for categories filter
          allDoughIngredients={filteredDoughIngredients}
          allDairyIngredients={filteredDairyIngredients}
          allMenus={ALL_MENUS} // Pass ALL_MENUS to Filters
          selectedIngredients={selectedIngredients}
          selectedAllergens={selectedAllergens}
          selectedCategories={selectedCategories}
          selectedDoughTypes={selectedDoughTypes}
          selectedDairyProducts={selectedDairyProducts}
          selectedMenus={selectedMenus} // Pass selectedMenus to Filters
          toggleIngredient={toggleIngredient}
          toggleAllergen={toggleAllergen}
          toggleCategory={toggleCategory}
          toggleDoughType={toggleDoughType}
          toggleDairyProduct={toggleDairyProduct}
          toggleMenu={toggleMenu} // Pass toggleMenu to Filters
          availableIngredientIds={availableIngredientIds}
          availableIngredientTypes={availableIngredientTypes}
          selectedCategoryObjects={selectedCategoryObjects}
        />
      )}
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => {
          const { currentPrice, originalPrice } = getPriceInfo(item);
          return <ProductCard product={item} currentPrice={currentPrice} originalPrice={originalPrice} />;
        }}
        keyExtractor={(item) => item.id.toString()} // Ensure key is string
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#f0f0f0"
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: 10, // Re-added margin
    paddingRight: 10
  },
  filterButton: {
    marginLeft: 10,
    padding: 8,
  },
  listContent: {
    paddingHorizontal: 10
  },
  searchBar: {
    flex: 1,
  }
})
