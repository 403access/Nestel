import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

interface BreadProduct {
  id: string;
  name: string;
  thumbnail: any; // Using 'any' for local image require
  weight: string;
  allergens: string[];
  ingredients: string;
  availability: string[];
}

const mockBreadProducts: BreadProduct[] = [
  {
    id: '1',
    name: 'Dinkelvollkornbrot',
    thumbnail: require('@/assets/images/favicon.png'), // Placeholder
    weight: '500g',
    allergens: ['Gluten'],
    ingredients: 'Dinkelvollkornmehl, Wasser, Hefe, Salz',
    availability: ['Monday', 'Wednesday', 'Friday'],
  },
  {
    id: '2',
    name: 'Roggenbrot',
    thumbnail: require('@/assets/images/favicon.png'), // Placeholder
    weight: '750g',
    allergens: ['Gluten'],
    ingredients: 'Roggenmehl, Wasser, Sauerteig, Salz',
    availability: ['Tuesday', 'Thursday', 'Saturday'],
  },
  {
    id: '3',
    name: 'Bauernbrot',
    thumbnail: require('@/assets/images/favicon.png'), // Placeholder
    weight: '1000g',
    allergens: ['Gluten', 'Lactose'],
    ingredients: 'Weizenmehl, Roggenmehl, Wasser, Hefe, Salz, Milch',
    availability: ['Daily'],
  },
  {
    id: '4',
    name: 'Brötchen',
    thumbnail: require('@/assets/images/favicon.png'), // Placeholder
    weight: '80g',
    allergens: ['Gluten'],
    ingredients: 'Weizenmehl, Wasser, Hefe, Salz',
    availability: ['Daily'],
  },
];

export default function ProductsScreen() {
  const renderItem = ({ item }: { item: BreadProduct }) => (
    <View style={styles.productCard}>
      <Image source={item.thumbnail} style={styles.thumbnail} />
      <View style={styles.details}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text>Weight: {item.weight}</Text>
        <Text>Allergens: {item.allergens.join(', ')}</Text>
        <Text>Ingredients: {item.ingredients}</Text>
        <Text>Available: {item.availability.join(', ')}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={mockBreadProducts}
        renderItem={renderItem}
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