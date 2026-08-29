import { ActivityIndicator, Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from "react-native";
import { colors, radius, spacing } from "@/lib/theme";

type Variant = "primary" | "secondary" | "outline";
type Size = "md" | "lg";

type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Button({
  label,
  onPress,
  variant = "primary",
  size = "md",
  disabled,
  loading,
  style,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        size === "lg" && styles.lg,
        variantStyles[variant],
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === "primary" ? colors.primaryForeground : colors.primary} />
      ) : (
        <Text style={[styles.label, variant === "primary" ? styles.labelPrimary : styles.labelDefault]}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.sm,
    minHeight: 48,
  },
  lg: {
    paddingVertical: spacing.lg,
    minHeight: 56,
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.85,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
  labelPrimary: {
    color: colors.primaryForeground,
  },
  labelDefault: {
    color: colors.text,
  },
});

const variantStyles: Record<Variant, StyleProp<ViewStyle>> = {
  primary: { backgroundColor: colors.primary },
  secondary: { backgroundColor: colors.surface },
  outline: { backgroundColor: "transparent", borderWidth: 1, borderColor: colors.border },
};
