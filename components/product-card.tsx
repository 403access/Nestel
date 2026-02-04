import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { BreadProduct } from '@/data/products';

interface ProductCardProps {
  product: BreadProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <View style={styles.productCard}>
      <Image source={product.thumbnail} style={styles.thumbnail} />
      <View style={styles.details}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text>Weight: {product.weight}</Text>
        <Text>Allergens: {product.allergens.join(', ')}</Text>
        <Text>Ingredients: {product.ingredients}</Text>
        <Text>Available: {product.availability.join(', ')}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
    backgroundColor: '#eee', // Placeholder background
  },
  details: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
