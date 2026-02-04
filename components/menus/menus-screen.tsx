import React from "react"
import { FlatList, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ALL_MENUS } from "@/data/menus"
import { MenuCard } from "./menu-card"

export function MenusScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={ALL_MENUS}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MenuCard menu={item} />}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10
  },
  listContent: {
    paddingHorizontal: 10,
    paddingBottom: 20
  }
})