import React from "react"
import { StyleSheet, Pressable, View } from "react-native"
import { ThemedText as Text } from "@/components/themed-text"
import { Menu, Offer } from "@/data/menus"
import { OfferProductItem } from "./offer-product-item"

interface MenuOfferCardProps {
  offer: Offer;
  menu: Menu;
}

export const MenuOfferCard: React.FC<MenuOfferCardProps> = ({ offer, menu }) => {
  return (
    <View style={offerStyles.offerCard}>
      <Text style={offerStyles.offerName}>{offer.name}</Text>
      {offer.description && (
        <Text style={offerStyles.offerDescription}>{offer.description}</Text>
      )}
      {offer.items.map((item) => (
        <OfferProductItem
          key={item.productId}
          productId={item.productId}
          menuId={menu.id}
        />
      ))}
    </View>
  )
}

const offerStyles = StyleSheet.create({
  offerCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#eee"
  },
  offerName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5
  },
  offerDescription: {
    fontSize: 12,
    color: "#777",
    marginBottom: 5
  },
})
