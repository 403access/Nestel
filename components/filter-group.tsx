import React from "react"
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native"

interface FilterGroupProps<T extends string> {
  title: string
  items: T[]
  selectedItems: T[]
  toggleItem: (item: T) => void
}

export function FilterGroup<T extends string>({
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
            key={item}
            style={[
              styles.filterButton,
              selectedItems.includes(item) && styles.filterButtonSelected
            ]}
            onPress={() => toggleItem(item)}
          >
            <Text style={styles.filterButtonText}>{item}</Text>
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
