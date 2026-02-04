import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText as Text } from '@/components/themed-text';
import { ThemedView as View } from '@/components/themed-view';
import { ALL_INGREDIENTS } from '@/data/ingredients';
import { quizStyles as styles } from '@/styles/quiz.styles';
import { useQuizGame } from '@/hooks/use-quiz-game';
import { ProductCard } from '@/components/quiz/ProductCard';
import { IngredientPill } from '@/components/quiz/IngredientPill';
import { QuizHeader } from '@/components/quiz/QuizHeader';
import { QuizControls } from '@/components/quiz/QuizControls';

export default function QuizScreen() {
  const {
    currentProduct,
    selectedIngredients,
    score,
    questionCount,
    answered,
    loadNewQuestion,
    toggleIngredientSelection,
    checkAnswer,
  } = useQuizGame();

  if (!currentProduct) {
    return <View style={styles.container}><Text>Loading quiz...</Text></View>;
  }

  return (
    <SafeAreaView style={[styles.container, { flex: 1 }]}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <QuizHeader score={score} questionCount={questionCount} />

        <ProductCard product={currentProduct} />

        <View style={styles.ingredientSelection}>
          <Text style={styles.sectionTitle}>Select all ingredients:</Text>
          <View style={styles.ingredientGrid}>
            {ALL_INGREDIENTS.map(ingredient => (
              <IngredientPill
                key={ingredient.id}
                ingredient={ingredient}
                isSelected={selectedIngredients.has(ingredient.id)}
                isCorrect={answered && currentProduct.ingredients.includes(ingredient.id)}
                isIncorrect={answered && !currentProduct.ingredients.includes(ingredient.id) && selectedIngredients.has(ingredient.id)}
                onPress={toggleIngredientSelection}
                disabled={answered}
              />
            ))}
          </View>
        </View>

        <QuizControls
          answered={answered}
          onCheckAnswer={checkAnswer}
          onNextQuestion={loadNewQuestion}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
