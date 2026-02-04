import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function SearchBar({ searchQuery, setSearchQuery }: SearchBarProps) {
  return (
    <TextInput
      style={styles.searchInput}
      placeholder="Search by name or ingredients..."
      value={searchQuery}
      onChangeText={setSearchQuery}
    />
  );
}

const styles = StyleSheet.create({
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
});
