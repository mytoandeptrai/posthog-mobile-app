import { router } from "expo-router";
import { useFeatureFlag, usePostHog } from "posthog-react-native";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { colors, spacing } from "@/lib/theme";

export default function CheckoutScreen() {
  const { items, totalAmount, itemsCount, clearCart } = useCart();
  const posthog = usePostHog();
  const toast = useToast();
  const checkoutVariant = useFeatureFlag("checkout-v2");
  const isCheckoutV2 = checkoutVariant === "test" || checkoutVariant === true;

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [coupon, setCoupon] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const canSubmit = fullName.trim() && address.trim() && city.trim() && items.length > 0;

  function handleCompletePurchase() {
    if (!canSubmit) return;

    setIsProcessing(true);
    setTimeout(() => {
      const orderId = `order_${Date.now()}`;
      posthog?.capture("order_completed", {
        order_id: orderId,
        total_amount: totalAmount,
        currency: "USD",
        items_count: itemsCount,
        checkout_variant: isCheckoutV2 ? "v2" : "v1",
      });
      clearCart();
      setIsProcessing(false);
      toast.show("Order placed successfully!");
      router.replace("/(tabs)");
    }, 1000);
  }

  if (items.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Your cart is empty. Add items before checking out.</Text>
        <Button label="Browse Products" variant="outline" onPress={() => router.replace("/(tabs)")} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>{itemsCount} item(s)</Text>
        <Text style={styles.summaryValue}>${totalAmount.toFixed(2)}</Text>
      </View>

      <Text style={styles.sectionTitle}>Shipping Address</Text>
      <Input label="Full Name" value={fullName} onChangeText={setFullName} placeholder="Jane Doe" />
      <Input label="Address" value={address} onChangeText={setAddress} placeholder="123 Main St" />
      <Input label="City" value={city} onChangeText={setCity} placeholder="San Francisco" />

      {isCheckoutV2 ? (
        <Input
          label="Discount Coupon"
          value={coupon}
          onChangeText={setCoupon}
          placeholder="e.g. WELCOME10"
          autoCapitalize="characters"
        />
      ) : null}

      <Button
        label="Complete Purchase"
        onPress={handleCompletePurchase}
        loading={isProcessing}
        disabled={!canSubmit}
        style={styles.submitButton}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  summaryLabel: {
    fontSize: 15,
    color: colors.textMuted,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
  },
  submitButton: {
    marginTop: spacing.md,
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md,
    padding: spacing.xl,
    backgroundColor: colors.background,
  },
  emptyText: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: "center",
  },
});
