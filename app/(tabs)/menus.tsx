import React from "react"
import { FlatList, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ThemedText as Text } from "@/components/themed-text"
import { ThemedView as View } from "@/components/themed-view"
import { ALL_MENUS, Menu } from "@/data/menus"
import { mockBreadProducts, BreadProduct } from "@/data/products"
import { Link } from "expo-router"

// Helper to get product details, including price calculation
const getProductInfo = (productId: number, menu: Menu) => {
  const product = mockBreadProducts.find((p) => p.id === productId)
  if (!product) return null

  let currentPrice = product.price
  const originalPrice = product.price
  let offerName: string | undefined

  // Find best discount within the context of this specific menu
  if (menu.offers) {
    for (const offer of menu.offers) {
      const menuItem = offer.items.find((item) => item.productId === productId)
      if (menuItem && menuItem.discountPrice !== undefined) {
        currentPrice = Math.min(currentPrice, menuItem.discountPrice)
        offerName = offer.name
      }
    }
  }

  return { product, currentPrice, originalPrice, offerName }
}

interface MenuOfferCardProps {
  offer: {
    id: number
    name: string
    items: { productId: number; discountPrice?: number }[]
  }
  menu: Menu
}

const MenuOfferCard: React.FC<MenuOfferCardProps> = ({ offer, menu }) => {
  return (
    <View style={offerStyles.offerCard}>
      <Text style={offerStyles.offerName}>{offer.name}</Text>
      {offer.description && (
        <Text style={offerStyles.offerDescription}>{offer.description}</Text>
      )}
      {offer.items.map((item) => {
        const productInfo = getProductInfo(item.productId, menu)
        if (!productInfo) return null
        const { product, currentPrice, originalPrice } = productInfo

        return (
          <Link key={product.id} href={`/products/${product.id}`} asChild>
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

interface MenuCardProps {
  menu: Menu
}

const MenuCard: React.FC<MenuCardProps> = ({ menu }) => {
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

export default function MenusScreen() {
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
