import React from "react"
import { StyleSheet } from "react-native"
import { ThemedText as Text } from "@/components/themed-text"
import { ThemedView as View } from "@/components/themed-view"
import { Menu, MenuItem, Offer } from "@/data/menus"
import { mockBreadProducts } from "@/data/products"
import { Link } from "expo-router"
import { getPriceInfo } from "@/utils/pricing"

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
      {offer.items.map((item) => {
        const product = mockBreadProducts.find((p) => p.id === item.productId);
        if (!product) return null;

        const { currentPrice, originalPrice } = getPriceInfo(product, [menu.id]);

        return (
          <Link key={product.id} href={{ pathname: "/products/[id]", params: { id: product.id } }} asChild>
            <View style={offerStyles.productDetails}>
              <Text style={offerStyles.productName}>{product.name}</Text>
              <View style={offerStyles.priceContainer}>
                {originalPrice > currentPrice && (
                  <Text style={offerStyles.originalPriceStrikethrough}>
                    €{originalPrice.toFixed(2)}
                  </Text>
                )}
                <Text style={offerStyles.currentPrice}>
                  €{currentPrice.toFixed(2)}
                </Text>
              </View>
            </View>
          </Link>
        )
      })}
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
  productDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 3
  },
  productName: {
    fontSize: 14
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  originalPriceStrikethrough: {
    fontSize: 12,
    color: "#999",
    textDecorationLine: "line-through",
    marginRight: 5
  },
  currentPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333"
  }
})
