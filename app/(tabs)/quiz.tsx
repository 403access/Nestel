import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Pressable, ScrollView, Alert } from 'react-native';
import { ThemedText as Text } from '@/components/themed-text';
import { ThemedView as View } from '@/components/themed-view';
import { BreadProduct, mockBreadProducts } from '@/data/products';
import { ALL_INGREDIENTS, Ingredient } from '@/data/ingredients';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

export default function QuizScreen() {
  const [currentProduct, setCurrentProduct] = useState<BreadProduct | null>(null);
  const [selectedIngredients, setSelectedIngredients] = useState<Set<number>>(new Set());
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [answered, setAnswered] = useState(false);
  const tintColor = useThemeColor({}, 'tint');
  const colorScheme = useColorScheme();

  const buttonTextColor = (colorScheme === 'dark' && tintColor === Colors.dark.tint) ? Colors.light.text : '#fff';

  useEffect(() => {
    loadNewQuestion();
  }, []);

  const loadNewQuestion = () => {
    setAnswered(false);
    setSelectedIngredients(new Set());
    const randomIndex = Math.floor(Math.random() * mockBreadProducts.length);
    setCurrentProduct(mockBreadProducts[randomIndex]);
  };

  const toggleIngredientSelection = (ingredientId: number) => {
    if (answered) return;
    setSelectedIngredients(prev => {
      const newSet = new Set(prev);
      if (newSet.has(ingredientId)) {
        newSet.delete(ingredientId);
      } else {
        newSet.add(ingredientId);
      }
      return newSet;
    });
  };

  const checkAnswer = () => {
    if (!currentProduct) return;

    setQuestionCount(prev => prev + 1);
    setAnswered(true);

    const correctIngredients = new Set(currentProduct.ingredients);
    let correctCount = 0;
    let totalPossibleCorrect = correctIngredients.size;
    let totalSelected = selectedIngredients.size;

    selectedIngredients.forEach(id => {
      if (correctIngredients.has(id)) {
        correctCount++;
      }
    });

    // Simple scoring: count correctly identified ingredients. Could be more complex.
    if (correctCount === totalPossibleCorrect && totalSelected === totalPossibleCorrect) {
      setScore(prev => prev + 1);
      Alert.alert("Correct!", "You guessed all ingredients correctly!", [{ text: "Next Question", onPress: loadNewQuestion }]);
    } else {
      let message = "Incorrect! You missed some or selected extra ingredients.";
      const missing = Array.from(correctIngredients).filter(id => !selectedIngredients.has(id)).map(id => ALL_INGREDIENTS.find(ing => ing.id === id)?.name);
      const extra = Array.from(selectedIngredients).filter(id => !correctIngredients.has(id)).map(id => ALL_INGREDIENTS.find(ing => ing.id === id)?.name);

      if (missing.length > 0) {
        message += `
Missing: ${missing.join(", ")}`;
      }
      if (extra.length > 0) {
        message += `
Extra: ${extra.join(", ")}`;
      }
      Alert.alert("Try Again!", message, [{ text: "Next Question", onPress: loadNewQuestion }]);
    }
  };

  if (!currentProduct) {
    return <View style={styles.container}><Text>Loading quiz...</Text></View>;
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Guess the Ingredients!</Text>
        <Text style={styles.scoreText}>Score: {score}/{questionCount}</Text>
      </View>

      <View style={styles.productCard}>
        <Image source={currentProduct.thumbnail} style={styles.thumbnail} />
        <Text style={styles.productName}>{currentProduct.name}</Text>
      </View>

      <View style={styles.ingredientSelection}>
        <Text style={styles.sectionTitle}>Select all ingredients:</Text>
        <View style={styles.ingredientGrid}>
          {ALL_INGREDIENTS.map(ingredient => (
            <Pressable
              key={ingredient.id}
              style={[
                styles.ingredientPill,
                selectedIngredients.has(ingredient.id) && styles.ingredientPillSelected,
                answered && currentProduct.ingredients.includes(ingredient.id) && styles.ingredientPillCorrect,
                answered && !currentProduct.ingredients.includes(ingredient.id) && selectedIngredients.has(ingredient.id) && styles.ingredientPillIncorrect
              ]}
              onPress={() => toggleIngredientSelection(ingredient.id)}
              disabled={answered}
            >
              <Text style={[
                styles.ingredientText,
                selectedIngredients.has(ingredient.id) && styles.ingredientTextSelected
              ]}>
                {ingredient.name}
              </Text>
              {answered && currentProduct.ingredients.includes(ingredient.id) && (
                <Ionicons name="checkmark-circle" size={16} color="white" style={{ marginLeft: 5 }} />
              )}
              {answered && !currentProduct.ingredients.includes(ingredient.id) && selectedIngredients.has(ingredient.id) && (
                <Ionicons name="close-circle" size={16} color="white" style={{ marginLeft: 5 }} />
              )}
            </Pressable>
          ))}
        </View>
      </View>

      <Pressable
        style={[styles.button, { backgroundColor: tintColor }]}
        onPress={answered ? loadNewQuestion : checkAnswer}
      >
        <Text style={[styles.buttonText, { color: buttonTextColor }]}>{answered ? "Next Question" : "Check Answer"}</Text>
      </Pressable>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    alignItems: 'center',
    paddingBottom: 50, // Ensure content is not hidden by the bottom tab bar
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  scoreText: {
    fontSize: 18,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginBottom: 30,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    width: '100%',
    maxWidth: 400,
  },
  thumbnail: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 15,
    backgroundColor: '#eee', // Placeholder background
  },
  productName: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
  },
  ingredientSelection: {
    width: '100%',
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  ingredientGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10, // Modern way to add space between items
  },
  ingredientPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  ingredientPillSelected: {
    backgroundColor: '#6200EE', // Primary color for selected
    borderColor: '#6200EE',
  },
  ingredientPillCorrect: {
    backgroundColor: '#4CAF50', // Green for correct
    borderColor: '#4CAF50',
  },
  ingredientPillIncorrect: {
    backgroundColor: '#F44336', // Red for incorrect
    borderColor: '#F44336',
  },
  ingredientText: {
    color: '#333',
    fontSize: 16,
  },
  ingredientTextSelected: {
    color: '#fff',
  },
  button: {
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: '80%',
    maxWidth: 300,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
