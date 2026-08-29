import { router, Stack, useLocalSearchParams } from "expo-router";
import { usePostHog } from "posthog-react-native";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ProductThumbnail } from "@/components/ProductThumbnail";
import { QuantityStepper } from "@/components/QuantityStepper";
import { RatingStars } from "@/components/RatingStars";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { getProductById } from "@/data/products";
import { colors, spacing } from "@/lib/theme";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const posthog = usePostHog();
  const { addToCart } = useCart();
  const toast = useToast();
  const [quantity, setQuantity] = useState(1);

  const product = getProductById(id);

  useEffect(() => {
    if (!product) return;
    posthog?.capture("product_detail_viewed", {
      product_id: product.id,
      product_name: product.name,
    });
  }, [product, posthog]);

  if (!product) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Product not found.</Text>
      </View>
    );
  }

  function trackAddToCart() {
    if (!product) return;
    addToCart(product, quantity);
    posthog?.capture("cart_item_added", {
      product_id: product.id,
      product_name: product.name,
      price: product.price,
      quantity,
    });
  }

  function handleAddToCart() {
    if (!product) return;
    trackAddToCart();
    toast.show(`Added "${product.name}" to cart`);
  }

  function handleBuyNow() {
    if (!product) return;
    trackAddToCart();
    toast.show(`Added "${product.name}" to cart`);
    router.push("/checkout");
  }

  return (
    <>
      <Stack.Screen options={{ title: product.name }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.thumbnailWrap}>
          <ProductThumbnail product={product} size={160} />
        </View>

        <Badge label={product.category} />
        <Text style={styles.name}>{product.name}</Text>
        <RatingStars rating={product.rating} size={16} />
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <Text style={styles.description}>{product.description}</Text>

        <View style={styles.quantityRow}>
          <Text style={styles.quantityLabel}>Quantity</Text>
          <QuantityStepper quantity={quantity} onChange={setQuantity} />
        </View>

        <View style={styles.actions}>
          <Button label="Add to Cart" variant="outline" onPress={handleAddToCart} style={styles.actionButton} />
          <Button label="Buy Now" onPress={handleBuyNow} style={styles.actionButton} />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.sm,
  },
  thumbnailWrap: {
    alignItems: "center",
    marginBottom: spacing.md,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
  },
  price: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.text,
    marginTop: spacing.xs,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.textMuted,
    marginTop: spacing.sm,
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: spacing.lg,
  },
  quantityLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
  },
  actions: {
    flexDirection: "row",
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  actionButton: {
    flex: 1,
  },
  notFound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  notFoundText: {
    color: colors.textMuted,
    fontSize: 15,
  },
});
