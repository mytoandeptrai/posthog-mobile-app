import { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import * as Haptics from "expo-haptics";
import { usePostHog } from "posthog-react-native";

const DEMO_USER = {
  id: "demo-user-1",
  email: "demo@example.com",
  name: "Demo User",
  plan: "pro",
};

export default function ProfileRoute() {
  const posthog = usePostHog();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    posthog?.capture("profile_viewed");
  }, [posthog]);

  const handleLogin = () => {
    if (process.env.EXPO_OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    posthog?.identify(DEMO_USER.id, {
      email: DEMO_USER.email,
      name: DEMO_USER.name,
      plan: DEMO_USER.plan,
    });
    posthog?.reloadFeatureFlags();
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    if (process.env.EXPO_OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    posthog?.reset();
    setIsLoggedIn(false);
  };

  return (
    <View style={styles.container}>
      {/* Khai báo Header chuẩn trong FormSheet */}
      <Stack.Screen
        options={{
          title: "Profile",
          headerShown: true,
          headerTransparent: false,
        }}
      />

      <View style={styles.card}>
        <View style={styles.headerGroup}>
          <Text style={styles.title}>User Profile</Text>
          <Text style={styles.subtitle}>
            Manage your account status and PostHog identity
          </Text>
        </View>

        <View style={styles.infoBox}>
          <View style={styles.row}>
            <Text style={styles.label}>Status:</Text>
            <View
              style={[
                styles.badge,
                isLoggedIn ? styles.badgeActive : styles.badgeInactive,
              ]}
            >
              <Text
                style={[
                  styles.badgeText,
                  isLoggedIn
                    ? styles.badgeTextActive
                    : styles.badgeTextInactive,
                ]}
              >
                {isLoggedIn ? "Logged In" : "Anonymous"}
              </Text>
            </View>
          </View>

          {isLoggedIn && (
            <>
              <View style={styles.divider} />
              <View style={styles.row}>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.value}>{DEMO_USER.name}</Text>
              </View>

              <View style={styles.divider} />
              <View style={styles.row}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{DEMO_USER.email}</Text>
              </View>

              <View style={styles.divider} />
              <View style={styles.row}>
                <Text style={styles.label}>Plan:</Text>
                <Text style={[styles.value, styles.planText]}>
                  {DEMO_USER.plan}
                </Text>
              </View>
            </>
          )}
        </View>

        <Pressable
          onPress={isLoggedIn ? handleLogout : handleLogin}
          style={({ pressed }) => [
            styles.button,
            isLoggedIn ? styles.logoutButton : styles.loginButton,
            pressed && { opacity: 0.8 },
          ]}
        >
          <Text style={styles.buttonText}>
            {isLoggedIn ? "Log out" : "Log in as demo user"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    gap: 20,
  },
  headerGroup: {
    gap: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },
  subtitle: {
    fontSize: 13,
    color: "#6B7280",
  },
  infoBox: {
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  value: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "600",
  },
  planText: {
    textTransform: "uppercase",
    color: "#2563EB",
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeActive: {
    backgroundColor: "#D1FAE5",
  },
  badgeInactive: {
    backgroundColor: "#E5E7EB",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  badgeTextActive: {
    color: "#059669",
  },
  badgeTextInactive: {
    color: "#6B7280",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  button: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  loginButton: {
    backgroundColor: "#000000",
  },
  logoutButton: {
    backgroundColor: "#DC2626",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
});