import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing } from "@/lib/theme";

export function QuantityStepper({
  quantity,
  onChange,
  min = 1,
}: {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
}) {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        disabled={quantity <= min}
        onPress={() => onChange(quantity - 1)}
      >
        <Ionicons name="remove" size={18} color={quantity <= min ? colors.textMuted : colors.text} />
      </Pressable>
      <Text style={styles.value}>{quantity}</Text>
      <Pressable style={styles.button} onPress={() => onChange(quantity + 1)}>
        <Ionicons name="add" size={18} color={colors.text} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
  },
  button: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  value: {
    minWidth: 28,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    paddingHorizontal: spacing.xs,
  },
});
