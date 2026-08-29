import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { colors, spacing } from "@/lib/theme";

export function RatingStars({ rating, size = 14 }: { rating: number; size?: number }) {
  const fullStars = Math.round(rating);

  return (
    <View style={styles.row}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Ionicons
          key={index}
          name={index < fullStars ? "star" : "star-outline"}
          size={size}
          color={colors.star}
        />
      ))}
      <Text style={styles.value}>{rating.toFixed(1)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  value: {
    marginLeft: spacing.xs,
    fontSize: 13,
    color: colors.textMuted,
    fontWeight: "600",
  },
});
