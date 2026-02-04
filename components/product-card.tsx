import { ALL_ALLERGENS } from "@/data/allergens"
import { ALL_INGREDIENTS } from "@/data/ingredients"
import type { BreadProduct } from "@/data/products"
import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"

interface ProductCardProps {
  product: BreadProduct
}

export function ProductCard({ product }: ProductCardProps) {
  const getIngredientNames = (ingredientIds: number[]) => {
    return ingredientIds
      .map((id) => ALL_INGREDIENTS.find((ing) => ing.id === id)?.name)
      .filter(Boolean)
      .join(", ")
  }

  const getAllergenNames = (allergenIds: number[]) => {
    return allergenIds
      .map((id) => ALL_ALLERGENS.find((alg) => alg.id === id)?.name)
      .filter(Boolean)
      .join(", ")
  }

  return (
    <View style={styles.productCard}>
      <Image source={product.thumbnail} style={styles.thumbnail} />
      <View style={styles.details}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text>Weight: {product.weight}</Text>
        <Text>Allergens: {getAllergenNames(product.allergens)}</Text>
        <Text>Ingredients: {getIngredientNames(product.ingredients)}</Text>
        <Text>Available: {product.availability.join(", ")}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  productCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
    backgroundColor: "#eee" // Placeholder background
  },
  details: {
    flex: 1
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5
  }
})
