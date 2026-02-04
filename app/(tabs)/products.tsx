import React from "react"
import { FlatList, StyleSheet, View, TextInput } from "react-native"
import { mockBreadProducts } from "@/data/products"
import { ProductCard } from "@/components/product-card"
import { useProductSearch } from "@/hooks/use-product-search"

export default function ProductsScreen() {
  const { searchQuery, setSearchQuery, filteredProducts } =
    useProductSearch(mockBreadProducts)

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name or ingredients..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
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
  listContent: {
    paddingHorizontal: 10
  }
})
