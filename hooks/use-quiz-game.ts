import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { BreadProduct, mockBreadProducts } from '@/data/products';
import { ALL_INGREDIENTS, Ingredient } from '@/data/ingredients';

interface UseQuizGame {
  currentProduct: BreadProduct | null;
  selectedIngredients: Set<number>;
  score: number;
  questionCount: number;
  answered: boolean;
  loadNewQuestion: () => void;
  toggleIngredientSelection: (ingredientId: number) => void;
  checkAnswer: () => void;
}

export const useQuizGame = (): UseQuizGame => {
  const [currentProduct, setCurrentProduct] = useState<BreadProduct | null>(null);
  const [selectedIngredients, setSelectedIngredients] = useState<Set<number>>(new Set());
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [answered, setAnswered] = useState(false);

  const loadNewQuestion = useCallback(() => {
    setAnswered(false);
    setSelectedIngredients(new Set());
    const randomIndex = Math.floor(Math.random() * mockBreadProducts.length);
    setCurrentProduct(mockBreadProducts[randomIndex]);
  }, []);

  useEffect(() => {
    loadNewQuestion();
  }, [loadNewQuestion]);

  const toggleIngredientSelection = useCallback((ingredientId: number) => {
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
  }, [answered]);

  const checkAnswer = useCallback(() => {
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
  }, [currentProduct, selectedIngredients, loadNewQuestion]);

  return {
    currentProduct,
    selectedIngredients,
    score,
    questionCount,
    answered,
    loadNewQuestion,
    toggleIngredientSelection,
    checkAnswer,
  };
};