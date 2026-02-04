import { ALL_ALLERGENS } from "@/data/allergens"
import { ALL_INGREDIENTS } from "@/data/ingredients"
import type { BreadProduct } from "@/data/products"
import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"

interface ProductCardProps {
  product: BreadProduct
  currentPrice: number
  originalPrice?: number
}

export function ProductCard({
  product,
  currentPrice,
  originalPrice
}: ProductCardProps) {
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
        <View style={styles.priceContainer}>
          {originalPrice && originalPrice > currentPrice && (
            <Text style={styles.originalPriceStrikethrough}>
              €{originalPrice.toFixed(2)}
            </Text>
          )}
          <Text style={styles.priceText}>€{currentPrice.toFixed(2)}</Text>
        </View>
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
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5
  },
  priceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333"
  },
  originalPriceStrikethrough: {
    fontSize: 14,
    color: "#888",
    textDecorationLine: "line-through",
    marginRight: 5
  }
})
