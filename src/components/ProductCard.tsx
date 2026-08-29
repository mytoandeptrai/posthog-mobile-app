import { Pressable, StyleSheet, Text, View } from "react-native";
import type { Product } from "@/data/products";
import { colors, radius, spacing } from "@/lib/theme";
import { ProductThumbnail } from "./ProductThumbnail";
import { RatingStars } from "./RatingStars";

export function ProductCard({ product, onPress }: { product: Product; onPress: () => void }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.thumbnailWrap}>
        <ProductThumbnail product={product} size={72} />
      </View>
      <Text style={styles.category}>{product.category}</Text>
      <Text style={styles.name} numberOfLines={2}>
        {product.name}
      </Text>
      <RatingStars rating={product.rating} />
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.xs,
  },
  thumbnailWrap: {
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  category: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.textMuted,
    textTransform: "uppercase",
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
    minHeight: 36,
  },
  price: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.text,
    marginTop: spacing.xs,
  },
});
