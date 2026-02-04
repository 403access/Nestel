import React from 'react';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText as Text } from '@/components/themed-text';
import { Ingredient } from '@/data/ingredients';
import { quizStyles as styles } from '@/styles/quiz.styles';

interface IngredientPillProps {
  ingredient: Ingredient;
  isSelected: boolean;
  isCorrect: boolean;
  isIncorrect: boolean;
  onPress: (ingredientId: number) => void;
  disabled: boolean;
}

export const IngredientPill: React.FC<IngredientPillProps> = ({
  ingredient,
  isSelected,
  isCorrect,
  isIncorrect,
  onPress,
  disabled,
}) => {
  return (
    <Pressable
      key={ingredient.id}
      style={[
        styles.ingredientPill,
        isSelected && styles.ingredientPillSelected,
        isCorrect && styles.ingredientPillCorrect,
        isIncorrect && styles.ingredientPillIncorrect,
      ]}
      onPress={() => onPress(ingredient.id)}
      disabled={disabled}
    >
      <Text style={[styles.ingredientText, isSelected && styles.ingredientTextSelected]}>
        {ingredient.name}
      </Text>
      {isCorrect && <Ionicons name="checkmark-circle" size={16} color="white" style={{ marginLeft: 5 }} />}
      {isIncorrect && <Ionicons name="close-circle" size={16} color="white" style={{ marginLeft: 5 }} />}
    </Pressable>
  );
};