import React from "react"
import { Pressable } from "react-native"
import { ThemedText as Text } from "@/components/themed-text"
import { useThemeColor } from "@/hooks/use-theme-color"
import { useColorScheme } from "@/hooks/use-color-scheme"
import { Colors } from "@/constants/theme"
import { quizStyles as styles } from "@/styles/quiz.styles"

interface QuizControlsProps {
  answered: boolean
  onCheckAnswer: () => void
  onNextQuestion: () => void
}

export const QuizControls: React.FC<QuizControlsProps> = ({
  answered,
  onCheckAnswer,
  onNextQuestion
}) => {
  const tintColor = useThemeColor({}, "tint")
  const colorScheme = useColorScheme()

  // Determine button text color based on theme and tint color
  const buttonTextColor =
    colorScheme === "dark" && tintColor === Colors.dark.tint
      ? Colors.light.text
      : "#fff"

  return (
    <Pressable
      style={[styles.button, { backgroundColor: tintColor }]}
      onPress={answered ? onNextQuestion : onCheckAnswer}
    >
      <Text style={[styles.buttonText, { color: buttonTextColor }]}>
        {answered ? "Next Question" : "Check Answer"}
      </Text>
    </Pressable>
  )
}
