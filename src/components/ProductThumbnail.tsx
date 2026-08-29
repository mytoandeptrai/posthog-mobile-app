import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import type { Product } from "@/data/products";
import { radius } from "@/lib/theme";

export function ProductThumbnail({ product, size = 64 }: { product: Product; size?: number }) {
  return (
    <View
      style={[
        styles.container,
        { width: size, height: size, backgroundColor: `${product.color}1A` },
      ]}
    >
      <Ionicons name={product.icon} size={size * 0.5} color={product.color} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
});
