import React from "react"
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from "react-native"

interface FilterGroupProps<T extends { id: number; name: string }> {
  // Changed T.id to number
  title: string
  items: T[]
  selectedItems: number[] // now an array of IDs (numbers)
  toggleItem: (itemId: number) => void // now toggles by ID (number)
}

export function FilterGroup<T extends { id: number; name: string }>({
  title,
  items,
  selectedItems,
  toggleItem
}: FilterGroupProps<T>) {
  return (
    <View style={styles.filterContainer}>
      <Text style={styles.filterTitle}>{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {items.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.filterButton,
              selectedItems.includes(item.id) && styles.filterButtonSelected
            ]}
            onPress={() => toggleItem(item.id)}
          >
            <Text style={styles.filterButtonText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
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
