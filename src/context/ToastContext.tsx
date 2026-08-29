import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { Animated, StyleSheet, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, radius, spacing } from "@/lib/theme";

type ToastType = "success" | "error" | "info";

type ToastState = {
  message: string;
  type: ToastType;
};

type ToastContextValue = {
  show: (message: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const DURATION_MS = 2200;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastState | null>(null);
  const opacity = useRef(new Animated.Value(0)).current;
  const hideTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);
  const insets = useSafeAreaInsets();

  const show = useCallback(
    (message: string, type: ToastType = "success") => {
      if (hideTimeout.current) clearTimeout(hideTimeout.current);

      setToast({ message, type });
      opacity.stopAnimation();
      Animated.timing(opacity, { toValue: 1, duration: 180, useNativeDriver: true }).start();

      hideTimeout.current = setTimeout(() => {
        Animated.timing(opacity, { toValue: 0, duration: 220, useNativeDriver: true }).start(() => {
          setToast(null);
        });
      }, DURATION_MS);
    },
    [opacity],
  );

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      {toast ? (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.container,
            { bottom: insets.bottom + spacing.xl, opacity },
            toneStyles[toast.type],
          ]}
        >
          <Text style={styles.text}>{toast.message}</Text>
        </Animated.View>
      ) : null}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: spacing.lg,
    right: spacing.lg,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  text: {
    color: colors.primaryForeground,
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
});

const toneStyles: Record<ToastType, { backgroundColor: string }> = {
  success: { backgroundColor: colors.primary },
  error: { backgroundColor: colors.danger },
  info: { backgroundColor: colors.textMuted },
};
