import React from 'react';
import { ThemedText as Text } from '@/components/themed-text';
import { ThemedView as View } from '@/components/themed-view';
import { quizStyles as styles } from '@/styles/quiz.styles';

interface QuizHeaderProps {
  score: number;
  questionCount: number;
}

export const QuizHeader: React.FC<QuizHeaderProps> = ({ score, questionCount }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Guess the Ingredients!</Text>
      <Text style={styles.scoreText}>Score: {score}/{questionCount}</Text>
    </View>
  );
};