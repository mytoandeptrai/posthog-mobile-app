import Orders from "@/components/dom/orders";
import { ProfileButton } from "@/components/screen-header";
import { Stack } from "expo-router";
import * as Haptics from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";

export default function OrdersRoute() {
  return (
    <>
      {/* Cấu hình Header chuẩn SDK 54 */}
      <Stack.Screen
        options={{
          title: "Orders",
          headerLeft: () => (
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              <Pressable onPress={() => alert("More options pressed")}>
                <Ionicons name="ellipsis-horizontal" size={22} color="#333" />
              </Pressable>
              <Pressable onPress={() => alert("Filter options pressed")}>
                <Ionicons name="filter-outline" size={22} color="#333" />
              </Pressable>
            </View>
          ),
          headerRight: () => <ProfileButton />,
        }}
      />

      <Orders
        onButtonClick={async (size: number) => {
          if (process.env.EXPO_OS !== "web") {
            Haptics.impactAsync(
              [
                Haptics.ImpactFeedbackStyle.Light,
                Haptics.ImpactFeedbackStyle.Medium,
                Haptics.ImpactFeedbackStyle.Heavy,
              ][size]
            );
          }
        }}
      />
    </>
  );
}