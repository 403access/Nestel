import React from "react"
import { StyleSheet } from "react-native"
import { ThemedText as Text } from "@/components/themed-text"
import { ThemedView as View } from "@/components/themed-view"
import { Menu } from "@/data/menus"
import { MenuOfferCard } from "./menu-offer-card"

interface MenuCardProps {
  menu: Menu
}

export const MenuCard: React.FC<MenuCardProps> = ({ menu }) => {
  return (
    <View style={menuStyles.menuCard}>
      <Text style={menuStyles.menuName}>{menu.name}</Text>
      {menu.description && (
        <Text style={menuStyles.menuDescription}>{menu.description}</Text>
      )}
      {menu.offers &&
        menu.offers.map((offer) => (
          <MenuOfferCard key={offer.id} offer={offer} menu={menu} />
        ))}
      {!menu.offers?.length && (
        <Text style={menuStyles.noOffersText}>
          No offers available for this menu.
        </Text>
      )}
    </View>
  )
}

const menuStyles = StyleSheet.create({
  menuCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },
  menuName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5
  },
  menuDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10
  },
  noOffersText: {
    fontStyle: "italic",
    color: "#888"
  }
})
