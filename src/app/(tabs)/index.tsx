import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useFeatureFlag, usePostHog } from "posthog-react-native";
import { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { colors, radius, spacing } from "@/lib/theme";

export default function HomeScreen() {
  const posthog = usePostHog();
  const showPromoBanner = useFeatureFlag("show-promo-banner");

  useEffect(() => {
    posthog?.capture("product_list_viewed", { products_count: products.length });
  }, [posthog]);

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.content}
      data={products}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={styles.row}
      ListHeaderComponent={
        showPromoBanner ? (
          <View style={styles.banner}>
            <Ionicons name="sparkles-outline" size={20} color={colors.primaryForeground} />
            <Text style={styles.bannerText}>Free shipping on all orders this week!</Text>
          </View>
        ) : null
      }
      renderItem={({ item }) => (
        <ProductCard product={item} onPress={() => router.push(`/product/${item.id}`)} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  row: {
    gap: spacing.md,
  },
  banner: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  bannerText: {
    color: colors.primaryForeground,
    fontWeight: "600",
    fontSize: 14,
    flex: 1,
  },
});
