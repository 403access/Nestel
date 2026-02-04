import React from 'react';
import { StyleSheet, Image, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ThemedText as Text } from '@/components/themed-text';
import { ThemedView as View } from '@/components/themed-view';
import { mockBreadProducts } from '@/data/products';
import { ALL_INGREDIENTS } from '@/data/ingredients';
import { ALL_ALLERGENS } from '@/data/allergens';
import { getPriceInfo } from '@/utils/pricing';
import { ALL_MENUS } from '@/data/menus';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ALL_CATEGORIES } from '@/data/categories';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const productId = typeof id === 'string' ? parseInt(id, 10) : undefined;

  const product = mockBreadProducts.find(p => p.id === productId);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Product not found.</Text>
      </View>
    );
  }

  // For simplicity, we'll calculate prices without selected menus in this detail view
  // If dynamic pricing based on selected menus is needed here, selectedMenus would need to be passed down.
  const { currentPrice, originalPrice } = getPriceInfo(product, []); // No selected menus for detail view initially

  const getIngredientNames = (ingredientIds: number[]) => {
    return ingredientIds
      .map((ingId) => ALL_INGREDIENTS.find((ing) => ing.id === ingId)?.name)
      .filter(Boolean)
      .join(", ");
  };

  const getAllergenNames = (allergenIds: number[]) => {
    return allergenIds
      .map((algId) => ALL_ALLERGENS.find((alg) => alg.id === algId)?.name)
      .filter(Boolean)
      .join(", ");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.productCard}>
          <Image source={product.thumbnail} style={styles.thumbnail} />
          <Text style={styles.productName}>{product.name}</Text>
          <View style={styles.priceContainer}>
            {originalPrice > currentPrice && (
              <Text style={styles.originalPriceStrikethrough}>€{originalPrice.toFixed(2)}</Text>
            )}
            <Text style={styles.priceText}>€{currentPrice.toFixed(2)}</Text>
          </View>

          <Text style={styles.detailText}>Weight: {product.weight}</Text>
          <Text style={styles.detailText}>Category: {ALL_CATEGORIES.find(cat => cat.id === product.category)?.name}</Text>
          <Text style={styles.detailText}>Availability: {product.availability.join(", ")}</Text>
          <Text style={styles.detailText}>Ingredients: {getIngredientNames(product.ingredients)}</Text>
          <Text style={styles.detailText}>Allergens: {getAllergenNames(product.allergens)}</Text>
          {product.menuIds && product.menuIds.length > 0 && (
            <Text style={styles.detailText}>Part of Menus: {product.menuIds.map(id => ALL_MENUS.find(m => m.id === id)?.name).filter(Boolean).join(', ')}</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    width: '100%',
    maxWidth: 500,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  thumbnail: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
    backgroundColor: '#eee',
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  priceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  originalPriceStrikethrough: {
    fontSize: 16,
    color: '#888',
    textDecorationLine: 'line-through',
    marginRight: 10,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
  },
});
