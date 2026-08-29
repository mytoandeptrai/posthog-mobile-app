// This component is platform-specific.

import { Ionicons } from "@expo/vector-icons";
import Dashboard from "@/components/dom/dashboard";
import { ProfileButton } from "@/components/screen-header";
import { router, Stack } from "expo-router";
import * as Haptics from "expo-haptics";
import { Pressable, View, Text } from "react-native";
import { usePostHog } from "posthog-react-native";

export default function IndexRoute() {
  const posthog = usePostHog();
  return (
    <>
      {/* Cấu hình Header chuẩn SDK 54 */}
      <Stack.Screen
        options={{
          title: "Dashboard",
          headerLargeTitle: true,
          headerRight: () => (
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
            >
              <Pressable onPress={() => alert("Notification menu pressed")}>
                <Ionicons name="notifications-outline" size={22} color="#333" />
              </Pressable>
              <Pressable onPress={() => router.push("/checkout")}>
                <Ionicons name="cart-outline" size={22} color="#333" />
              </Pressable>
              <Pressable onPress={() => router.push("/profile")}>
                <Ionicons name="person-outline" size={22} color="#333" />
              </Pressable>
              <ProfileButton />
            </View>
          ),
        }}
      />

      <Dashboard
        notify={() => {
          posthog?.capture("demo_alert_triggered");
          alert("New Order (from a DOM component 🚀)");
        }}
        onButtonClick={async (size: number) => {
          if (process.env.EXPO_OS !== "web") {
            Haptics.impactAsync(
              [
                Haptics.ImpactFeedbackStyle.Light,
                Haptics.ImpactFeedbackStyle.Medium,
                Haptics.ImpactFeedbackStyle.Heavy,
              ][size],
            );
          }
        }}
      />
    </>
  );
}
