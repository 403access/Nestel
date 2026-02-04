import { ProductCard } from "@/components/product-card"
import type { Allergen } from "@/data/allergens"
import * as Allergens from "@/data/allergens"
import type { Ingredient } from "@/data/ingredients"
import * as Ingredients from "@/data/ingredients"
import { mockBreadProducts } from "@/data/products"
import { useProductSearch } from "@/hooks/use-product-search"
import React from "react"
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native"

const allIngredients = Object.values(Ingredients).filter(
  (v) => typeof v === "string"
) as Ingredient[]
const allAllergens = Object.values(Allergens).filter(
  (v) => typeof v === "string"
) as Allergen[]

export default function ProductsScreen() {
  const {
    searchQuery,
    setSearchQuery,
    filteredProducts,
    selectedIngredients,
    setSelectedIngredients,
    selectedAllergens,
    setSelectedAllergens
  } = useProductSearch(mockBreadProducts)

  const toggleIngredient = (ingredient: Ingredient) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient]
    )
  }

  const toggleAllergen = (allergen: Allergen) => {
    setSelectedAllergens((prev) =>
      prev.includes(allergen)
        ? prev.filter((a) => a !== allergen)
        : [...prev, allergen]
    )
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name or ingredients..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <View style={styles.filterContainer}>
        <Text style={styles.filterTitle}>Ingredients</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {allIngredients.map((ingredient) => (
            <TouchableOpacity
              key={ingredient}
              style={[
                styles.filterButton,
                selectedIngredients.includes(ingredient) &&
                  styles.filterButtonSelected
              ]}
              onPress={() => toggleIngredient(ingredient)}
            >
              <Text style={styles.filterButtonText}>{ingredient}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.filterContainer}>
        <Text style={styles.filterTitle}>Allergens</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {allAllergens.map((allergen) => (
            <TouchableOpacity
              key={allergen}
              style={[
                styles.filterButton,
                selectedAllergens.includes(allergen) &&
                  styles.filterButtonSelected
              ]}
              onPress={() => toggleAllergen(allergen)}
            >
              <Text style={styles.filterButtonText}>{allergen}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#f0f0f0"
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#fff"
  },
  filterContainer: {
    paddingHorizontal: 10,
    marginBottom: 10
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5
  },
  filterButton: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    borderColor: "#ccc",
    borderWidth: 1
  },
  filterButtonSelected: {
    backgroundColor: "#007bff",
    borderColor: "#007bff"
  },
  filterButtonText: {
    color: "#333"
  },
  listContent: {
    paddingHorizontal: 10
  }
})
