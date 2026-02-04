import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { mockBreadProducts } from '@/data/products';
import { ProductCard } from '@/components/product-card';

export default function ProductsScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={mockBreadProducts}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#f0f0f0',
  },
  listContent: {
    paddingHorizontal: 10,
  },
});
