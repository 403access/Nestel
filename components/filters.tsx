import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ingredient } from '@/data/ingredients';
import { Allergen } from '@/data/allergens';

interface FiltersProps {
  allIngredients: Ingredient[];
  allAllergens: Allergen[];
  selectedIngredients: Ingredient[];
  selectedAllergens: Allergen[];
  toggleIngredient: (ingredient: Ingredient) => void;
  toggleAllergen: (allergen: Allergen) => void;
}

export function Filters({
  allIngredients,
  allAllergens,
  selectedIngredients,
  selectedAllergens,
  toggleIngredient,
  toggleAllergen,
}: FiltersProps) {
  return (
    <>
      <View style={styles.filterContainer}>
        <Text style={styles.filterTitle}>Ingredients</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {allIngredients.map((ingredient) => (
            <TouchableOpacity
              key={ingredient}
              style={[
                styles.filterButton,
                selectedIngredients.includes(ingredient) && styles.filterButtonSelected,
              ]}
              onPress={() => toggleIngredient(ingredient)}>
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
                selectedAllergens.includes(allergen) && styles.filterButtonSelected,
              ]}
              onPress={() => toggleAllergen(allergen)}>
              <Text style={styles.filterButtonText}>{allergen}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  filterButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  filterButtonSelected: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  filterButtonText: {
    color: '#333',
  },
});
