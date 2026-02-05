import React from "react"
import { StyleSheet, Pressable, View } from "react-native"
import { ThemedText as Text } from "@/components/themed-text"
import { mockBreadProducts } from "@/data/products"
import { Link } from "expo-router"
import { getPriceInfo } from "@/utils/pricing"

interface OfferProductItemProps {
  productId: number;
  menuId: number;
}

export const OfferProductItem: React.FC<OfferProductItemProps> = ({ productId, menuId }) => {
  const product = mockBreadProducts.find((p) => p.id === productId);
  if (!product) return null;

  const { currentPrice, originalPrice } = getPriceInfo(product, [menuId]);

  return (
    <Link key={product.id} href={{ pathname: "/products/[id]", params: { id: product.id } }} asChild>
      <Pressable style={offerProductItemStyles.productDetails}>
        <Text style={offerProductItemStyles.productName}>{product.name}</Text>
        <View style={offerProductItemStyles.priceContainer}>
          {originalPrice > currentPrice && (
            <Text style={offerProductItemStyles.originalPriceStrikethrough}>
              €{originalPrice.toFixed(2)}
            </Text>
          )}
          <Text style={offerProductItemStyles.currentPrice}>
            €{currentPrice.toFixed(2)}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
};

const offerProductItemStyles = StyleSheet.create({
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
});
