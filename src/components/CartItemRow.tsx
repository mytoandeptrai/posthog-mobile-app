import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { CartItem } from "@/context/CartContext";
import { colors, spacing } from "@/lib/theme";
import { ProductThumbnail } from "./ProductThumbnail";
import { QuantityStepper } from "./QuantityStepper";

export function CartItemRow({
  item,
  onChangeQuantity,
  onRemove,
}: {
  item: CartItem;
  onChangeQuantity: (quantity: number) => void;
  onRemove: () => void;
}) {
  return (
    <View style={styles.row}>
      <ProductThumbnail product={item.product} size={56} />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {item.product.name}
        </Text>
        <Text style={styles.price}>${item.product.price.toFixed(2)}</Text>
        <QuantityStepper quantity={item.quantity} onChange={onChangeQuantity} />
      </View>
      <Pressable onPress={onRemove} hitSlop={8} style={styles.removeButton}>
        <Ionicons name="trash-outline" size={20} color={colors.danger} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  info: {
    flex: 1,
    gap: spacing.xs,
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
  },
  price: {
    fontSize: 14,
    color: colors.textMuted,
  },
  removeButton: {
    padding: spacing.xs,
  },
});
