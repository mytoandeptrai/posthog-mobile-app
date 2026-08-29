import { router } from "expo-router";
import { usePostHog } from "posthog-react-native";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { colors, radius, spacing } from "@/lib/theme";

const DEMO_USERS = [
  { name: "Alex Nguyen", email: "alex@example.com" },
  { name: "Jamie Tran", email: "jamie@example.com" },
];

export default function LoginScreen() {
  const { loginDemo, isLoggingIn } = useAuth();
  const posthog = usePostHog();
  const toast = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function selectDemoUser(demoUser: (typeof DEMO_USERS)[number]) {
    setName(demoUser.name);
    setEmail(demoUser.email);
  }

  async function handleLogin() {
    if (!name.trim() || !email.trim()) return;

    const user = await loginDemo(name.trim(), email.trim());
    posthog?.identify(user.id, { email: user.email, name: user.name, plan: "pro" });
    posthog?.reloadFeatureFlags();
    toast.show(`Welcome back, ${user.name}!`);
    router.back();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quick demo login</Text>
      <View style={styles.demoRow}>
        {DEMO_USERS.map((demoUser) => (
          <Pressable
            key={demoUser.email}
            style={styles.demoChip}
            onPress={() => selectDemoUser(demoUser)}
          >
            <Text style={styles.demoChipText}>{demoUser.name}</Text>
          </Pressable>
        ))}
      </View>

      <Input label="Name" value={name} onChangeText={setName} placeholder="Jane Doe" />
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="jane@example.com"
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <Button
        label="Log In"
        onPress={handleLogin}
        loading={isLoggingIn}
        disabled={!name.trim() || !email.trim()}
        style={styles.submitButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
    gap: spacing.lg,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },
  demoRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  demoChip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  demoChipText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.text,
  },
  submitButton: {
    marginTop: spacing.md,
  },
});
