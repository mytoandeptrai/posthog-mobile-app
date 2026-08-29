import { Slot, Stack, useSegments } from "expo-router";
import { Platform } from "react-native";
import { StatusBar } from "expo-status-bar";

export const unstable_settings = {
  initialRouteName: "index",
  "(index)": {
    initialRouteName: "index",
  },
  "(orders)": {
    initialRouteName: "orders",
  },
  "(products)": {
    initialRouteName: "products",
  },
};

const titles = {
  index: "Dashboard",
  orders: "Orders",
  products: "Products",
};

export default function GroupLayout() {
  if (process.env.EXPO_OS === "web") {
    return <Slot />;
  }

  // Tự động nhận diện Tab đang chọn: "index", "orders" hoặc "products"
  const segments = useSegments();
  const rawGroup = segments[0] || "(index)";
  const currentTab = (rawGroup.replace(/[()]/g, "") || "index") as keyof typeof titles;

  return (
    <>
      <Stack
        screenOptions={{
          headerShadowVisible: false,
          ...Platform.select({
            ios: {
              headerTransparent: true,
              headerTitleStyle: { color: "#000000" },
            },
            default: {
              headerStyle: { backgroundColor: "#FFFFFF" },
            },
          }),
        }}
      >
        {/* Render đúng màn hình chính tương ứng với Tab đang active */}
        <Stack.Screen
          name={currentTab}
          options={{
            title: titles[currentTab] || "Dashboard",
            headerLargeTitle: Platform.OS === "ios" && currentTab === "index",
          }}
        />

        {/* Các màn hình Modal phụ dùng chung */}
        <Stack.Screen
          name="alert"
          options={{
            title: "",
            contentStyle: { backgroundColor: "white" },
            presentation: "formSheet",
            sheetAllowedDetents: [0.25],
            sheetGrabberVisible: true,
          }}
        />
        <Stack.Screen
          name="profile"
          options={{
            title: "Profile",
            contentStyle: { backgroundColor: "white" },
            presentation: "formSheet",
            sheetAllowedDetents: [0.5],
            sheetGrabberVisible: true,
          }}
        />
        <Stack.Screen
          name="checkout"
          options={{
            title: "Checkout",
            contentStyle: { backgroundColor: "white" },
          }}
        />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}