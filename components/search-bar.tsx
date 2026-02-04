import React from "react"
import { StyleSheet, TextInput, TextStyle } from "react-native"

interface SearchBarProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  style?: TextStyle
}

export function SearchBar({
  searchQuery,
  setSearchQuery,
  style
}: SearchBarProps) {
  return (
    <TextInput
      style={[styles.searchInput, style]} // Apply external style
      placeholder="Search by name or ingredients..."
      value={searchQuery}
      onChangeText={setSearchQuery}
    />
  )
}

const styles = StyleSheet.create({
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: "#fff"
  }
})
