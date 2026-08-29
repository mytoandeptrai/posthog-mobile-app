import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useFeatureFlags, usePostHog } from "posthog-react-native";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { colors, spacing } from "@/lib/theme";

export default function ProfileScreen() {
  const { user, isAuthenticated, logout } = useAuth();
  const posthog = usePostHog();
  const toast = useToast();
  const featureFlags = useFeatureFlags();
  const flagEntries = Object.entries(featureFlags ?? {});

  function handleTriggerTestError() {
    posthog?.capture("app_error_triggered", {
      source: "profile_screen",
      triggered_at: new Date().toISOString(),
    });
    toast.show("Test error event sent to PostHog", "info");
  }

  function handleLogout() {
    logout();
    posthog?.reset();
    toast.show("Logged out", "info");
  }

  if (!isAuthenticated) {
    return (
      <View style={styles.loggedOutContainer}>
        <Ionicons name="person-circle-outline" size={72} color={colors.textMuted} />
        <Text style={styles.loggedOutTitle}>You're not logged in</Text>
        <Text style={styles.loggedOutSubtitle}>Log in to see your profile and feature flags.</Text>
        <Button label="Log In" onPress={() => router.push("/login")} style={styles.loginButton} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Card style={styles.userCard}>
        <Image
          source={require("@/assets/evanbacon.avif")}
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user?.name}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
        </View>
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Active Feature Flags</Text>
        {flagEntries.length === 0 ? (
          <Text style={styles.emptyFlags}>No feature flags loaded yet.</Text>
        ) : (
          flagEntries.map(([key, value]) => (
            <View key={key} style={styles.flagRow}>
              <Text style={styles.flagKey}>{key}</Text>
              <Text style={styles.flagValue}>{String(value)}</Text>
            </View>
          ))
        )}
      </Card>

      <Button label="Trigger Test Error" variant="outline" onPress={handleTriggerTestError} />
      <Button label="Log Out" variant="secondary" onPress={handleLogout} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  loggedOutContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xl,
    gap: spacing.sm,
    backgroundColor: colors.background,
  },
  loggedOutTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
  },
  loggedOutSubtitle: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: "center",
    marginBottom: spacing.md,
  },
  loginButton: {
    minWidth: 160,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  userInfo: {
    gap: 2,
  },
  userName: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },
  userEmail: {
    fontSize: 13,
    color: colors.textMuted,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.sm,
  },
  emptyFlags: {
    fontSize: 13,
    color: colors.textMuted,
  },
  flagRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: spacing.xs,
    borderTopWidth: 1,
    borderColor: colors.border,
  },
  flagKey: {
    fontSize: 13,
    color: colors.text,
    flexShrink: 1,
  },
  flagValue: {
    fontSize: 13,
    color: colors.textMuted,
    fontWeight: "600",
  },
});
