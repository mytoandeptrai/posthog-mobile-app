import { StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing } from "@/lib/theme";

type Tone = "default" | "success" | "danger";

export function Badge({ label, tone = "default" }: { label: string; tone?: Tone }) {
  return (
    <View style={[styles.badge, toneStyles[tone].badge]}>
      <Text style={[styles.label, toneStyles[tone].label]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    paddingVertical: spacing.xs / 2,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.pill,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
  },
});

const toneStyles: Record<Tone, { badge: object; label: object }> = {
  default: { badge: { backgroundColor: colors.surface }, label: { color: colors.textMuted } },
  success: { badge: { backgroundColor: "#DCFCE7" }, label: { color: colors.success } },
  danger: { badge: { backgroundColor: "#FEE2E2" }, label: { color: colors.danger } },
};
