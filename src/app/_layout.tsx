import { Ionicons } from "@expo/vector-icons";
import { Tabs, usePathname } from "expo-router";
import PostHog, { PostHogProvider } from "posthog-react-native";
import { useEffect } from "react";
import * as Application from "expo-application";
import { Platform } from "react-native";

export const posthog = new PostHog(
  "phc_oPFarYMtsgqThc7HZszyKXCWRd2yNmV37LjnQygPrg3s",
  {
    host: "https://us.i.posthog.com",
    captureAppLifecycleEvents: true,
    enableSessionReplay: true,
    flushAt: 10,
    flushInterval: 30,
  },
);

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
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#000000",
          tabBarInactiveTintColor: "#999999",
          tabBarStyle: {
            backgroundColor: "#FFFFFF",
          },
        }}
      >
        <Tabs.Screen
          name="(index)"
          options={{
            title: "Dashboard",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={22}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="(orders)"
          options={{
            title: "Orders",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "cart" : "cart-outline"}
                size={22}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="(products)"
          options={{
            title: "Products",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "cube" : "cube-outline"}
                size={22}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </PostHogProvider>
  );
}
