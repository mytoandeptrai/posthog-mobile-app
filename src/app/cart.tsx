import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { usePostHog } from "posthog-react-native";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { CartItemRow } from "@/components/CartItemRow";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { colors, spacing } from "@/lib/theme";

export default function CartScreen() {
  const { items, updateQuantity, removeFromCart, totalAmount, itemsCount } = useCart();
  const posthog = usePostHog();
  const toast = useToast();

  function handleRemove(productId: string, productName: string) {
    removeFromCart(productId);
    toast.show(`Removed "${productName}" from cart`, "info");
  }

  function handleCheckout() {
    posthog?.capture("checkout_started", {
      items_count: itemsCount,
      total_amount: totalAmount,
    });
    router.push("/checkout");
  }

  if (items.length === 0) {
    return (
      <View style={styles.empty}>
        <Ionicons name="cart-outline" size={64} color={colors.textMuted} />
        <Text style={styles.emptyTitle}>Your cart is empty</Text>
        <Button label="Browse Products" variant="outline" onPress={() => router.push("/")} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.list}
        data={items}
        keyExtractor={(item) => item.product.id}
        renderItem={({ item }) => (
          <CartItemRow
            item={item}
            onChangeQuantity={(quantity) => updateQuantity(item.product.id, quantity)}
            onRemove={() => handleRemove(item.product.id, item.product.name)}
          />
        )}
      />

      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${totalAmount.toFixed(2)}</Text>
        </View>
        <Button label="Proceed to Checkout" onPress={handleCheckout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    padding: spacing.lg,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md,
    padding: spacing.xl,
    backgroundColor: colors.background,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },
});
