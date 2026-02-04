import React from "react"
import { Image } from "react-native"
import { ThemedText as Text } from "@/components/themed-text"
import { ThemedView as View } from "@/components/themed-view"
import { BreadProduct } from "@/data/products"
import { quizStyles as styles } from "@/styles/quiz.styles"

interface ProductCardProps {
  product: BreadProduct
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <View style={styles.productCard}>
      <Image source={product.thumbnail} style={styles.thumbnail} />
      <Text style={styles.productName}>{product.name}</Text>
    </View>
  )
}
