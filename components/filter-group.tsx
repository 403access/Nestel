import React from "react"
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from "react-native"

interface FilterGroupProps<T extends { id: number; name: string }> {
  title: string
  items: T[]
  selectedItems: number[]
  toggleItem: (itemId: number) => void
  availableItemIds?: Set<number> // New prop for individual item disabling
  isDisabled?: boolean // New prop for group disabling
}

export function FilterGroup<T extends { id: number; name: string }>({
  title,
  items,
  selectedItems,
  toggleItem,
  availableItemIds,
  isDisabled = false // Default to false
}: FilterGroupProps<T>) {
  return (
    <View
      style={[
        styles.filterContainer,
        isDisabled && styles.filterContainerDisabled
      ]}
    >
      <Text style={styles.filterTitle}>{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {items.map((item) => {
          const isItemDisabled =
            isDisabled || (availableItemIds && !availableItemIds.has(item.id))
          return (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.filterButton,
                selectedItems.includes(item.id) && styles.filterButtonSelected,
                isItemDisabled && styles.filterButtonDisabled
              ]}
              onPress={() => toggleItem(item.id)}
              disabled={isItemDisabled}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  isItemDisabled && styles.filterButtonTextDisabled
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  filterContainer: {
    paddingHorizontal: 10,
    marginBottom: 10
  },
  filterContainerDisabled: {
    opacity: 0.5
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
  filterButtonDisabled: {
    backgroundColor: "#e0e0e0",
    borderColor: "#bbb"
  },
  filterButtonText: {
    color: "#333"
  },
  filterButtonTextDisabled: {
    color: "#888"
  }
})
