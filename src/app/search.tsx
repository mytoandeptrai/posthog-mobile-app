import { router } from "expo-router";
import { usePostHog } from "posthog-react-native";
import { useEffect, useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { ProductCard } from "@/components/ProductCard";
import { Input } from "@/components/ui/Input";
import { products } from "@/data/products";
import { colors, spacing } from "@/lib/theme";

export default function SearchScreen() {
  const posthog = usePostHog();
  const [searchTerm, setSearchTerm] = useState("");

  const results = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return [];
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term),
    );
  }, [searchTerm]);

  useEffect(() => {
    const term = searchTerm.trim();
    if (!term) return;

    const timeout = setTimeout(() => {
      posthog?.capture("product_searched", {
        search_term: term,
        results_count: results.length,
      });
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchTerm, results.length, posthog]);

  return (
    <View style={styles.container}>
      <Input
        autoFocus
        placeholder="Search products or categories"
        value={searchTerm}
        onChangeText={setSearchTerm}
        style={styles.searchInput}
      />

      {searchTerm.trim() && results.length === 0 ? (
        <Text style={styles.emptyText}>No products match "{searchTerm}".</Text>
      ) : (
        <FlatList
          contentContainerStyle={styles.list}
          data={results}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <ProductCard product={item} onPress={() => router.push(`/product/${item.id}`)} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
    gap: spacing.lg,
  },
  searchInput: {
    marginBottom: 0,
  },
  list: {
    gap: spacing.md,
  },
  row: {
    gap: spacing.md,
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 14,
    textAlign: "center",
    marginTop: spacing.xl,
  },
});
