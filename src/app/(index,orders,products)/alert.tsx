import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function AlertRoute() {
  return (
    <View style={{ flex: 1, padding: 24, gap: 8 }}>
      {/* Cấu hình Header chuẩn SDK 54 */}
      <Stack.Screen
        options={{
          title: "",
          headerRight: () => (
            <Pressable onPress={() => alert("Menu pressed")}>
              <Ionicons name="ellipsis-horizontal" size={24} color="#333" />
            </Pressable>
          ),
        }}
      />

      <Text
        style={{
          fontSize: 36,
          color: "#333",
          fontWeight: "bold",
          fontFamily: process.env.EXPO_OS === "ios" ? "ui-rounded" : undefined,
        }}
      >
        Alert
      </Text>
      <Text
        style={{
          fontSize: 20,
          color: "#333",
          fontFamily: process.env.EXPO_OS === "ios" ? "ui-rounded" : undefined,
        }}
      >
        This is additional information in the prompt.
      </Text>
      <View style={{ flex: 1 }} />

      <Pressable
        onPress={() => console.log("Dismiss")}
        style={{
          padding: 12,
          borderRadius: 12,
          backgroundColor: "#000",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: "#fff",
            fontWeight: "600",
          }}
        >
          Dismiss
        </Text>
      </Pressable>
    </View>
  );
}