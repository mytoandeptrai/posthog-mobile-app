import Products from "@/components/dom/products";
import { ProfileButton } from "@/components/screen-header";
import { Stack } from "expo-router";
import * as Haptics from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";

export default function ProductsRoute() {
  return (
    <>
      {/* Cấu hình Header chuẩn SDK 54 */}
      <Stack.Screen
        options={{
          title: "Products",
          headerRight: () => (
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              <Pressable onPress={() => alert("Calendar options pressed")}>
                <Ionicons name="calendar-outline" size={22} color="#333" />
              </Pressable>
              <Pressable onPress={() => alert("Export options pressed")}>
                <Ionicons name="share-outline" size={22} color="#333" />
              </Pressable>
              <ProfileButton />
            </View>
          ),
        }}
      />

      <Products
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