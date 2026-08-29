import * as Application from "expo-application";
import { Stack, usePathname } from "expo-router";
import PostHog, { PostHogProvider } from "posthog-react-native";
import { useEffect } from "react";
import { Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";

export const posthog = new PostHog(process.env.EXPO_PUBLIC_POSTHOG_API_KEY || "", {
  host: process.env.EXPO_PUBLIC_POSTHOG_HOST || "",
  captureAppLifecycleEvents: true,
  enableSessionReplay: true,
  flushAt: 10,
  flushInterval: 30,
  sessionReplayConfig: {
    maskAllTextInputs: true,
    maskAllImages: false,
  },
});

posthog.register({
  environment: __DEV__ ? "development" : "production",
  app_version: Application.nativeApplicationVersion,
  platform: Platform.OS,
});

export default function RootLayout() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      posthog.screen(pathname);
    }
  }, [pathname]);

  return (
    <PostHogProvider client={posthog} autocapture>
      <SafeAreaProvider>
        <AuthProvider>
          <CartProvider>
            <ToastProvider>
              <Stack screenOptions={{ headerBackTitle: "Back" }}>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                  name="login"
                  options={{ presentation: "modal", title: "Log In" }}
                />
                <Stack.Screen name="product/[id]" options={{ title: "" }} />
                <Stack.Screen name="search" options={{ title: "Search" }} />
                <Stack.Screen name="cart" options={{ title: "Cart" }} />
                <Stack.Screen name="checkout" options={{ title: "Checkout" }} />
              </Stack>
            </ToastProvider>
          </CartProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </PostHogProvider>
  );
}
