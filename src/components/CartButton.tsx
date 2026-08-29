import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useCart } from "@/context/CartContext";
import { colors, radius } from "@/lib/theme";

export function CartButton() {
  const { itemsCount } = useCart();

  return (
    <Pressable onPress={() => router.push("/cart")} hitSlop={8} style={styles.container}>
      <Ionicons name="cart-outline" size={22} color={colors.text} />
      {itemsCount > 0 ? (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{itemsCount > 9 ? "9+" : itemsCount}</Text>
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -6,
    right: -6,
    minWidth: 16,
    height: 16,
    borderRadius: radius.pill,
    backgroundColor: colors.danger,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  badgeText: {
    color: colors.primaryForeground,
    fontSize: 10,
    fontWeight: "700",
  },
});
