import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Application from "expo-application";
import { Stack, usePathname } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import PostHog, { PostHogProvider } from "posthog-react-native";
import { useEffect, useState } from "react";
import { Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";
import { ONBOARDING_STORAGE_KEY } from "./onboarding";

SplashScreen.preventAutoHideAsync().catch(() => {});

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
  const [initialRouteName, setInitialRouteName] = useState<"onboarding" | "(tabs)" | null>(
    Platform.OS === "web" ? "(tabs)" : null,
  );

  useEffect(() => {
    if (pathname) {
      posthog.screen(pathname);
    }
  }, [pathname]);

  useEffect(() => {
    if (Platform.OS === "web") {
      SplashScreen.hideAsync();
      return;
    }
    AsyncStorage.getItem(ONBOARDING_STORAGE_KEY)
      .then((value) => setInitialRouteName(value === "true" ? "(tabs)" : "onboarding"))
      .catch(() => setInitialRouteName("(tabs)"))
      .finally(() => SplashScreen.hideAsync());
  }, []);

  if (!initialRouteName) {
    return null;
  }

  return (
    <PostHogProvider client={posthog} autocapture>
      <SafeAreaProvider>
        <AuthProvider>
          <CartProvider>
            <ToastProvider>
              <Stack initialRouteName={initialRouteName} screenOptions={{ headerBackTitle: "Back" }}>
                <Stack.Screen name="onboarding" options={{ headerShown: false, gestureEnabled: false }} />
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
