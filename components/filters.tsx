import type { Allergen } from "@/data/allergens"
import type { Category } from "@/data/categories"
import type { Ingredient } from "@/data/ingredients"
import React from "react"
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native"

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
      <View style={styles.filterContainer}>
        <Text style={styles.filterTitle}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {allCategories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.filterButton,
                selectedCategories.includes(category) &&
                  styles.filterButtonSelected
              ]}
              onPress={() => toggleCategory(category)}
            >
              <Text style={styles.filterButtonText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

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
    </>
  )
}

const styles = StyleSheet.create({
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
  }
})
