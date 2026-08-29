import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { usePostHog } from "posthog-react-native";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  type NativeSyntheticEvent,
  type NativeScrollEvent,
} from "react-native";
import { Button } from "@/components/ui/Button";
import { onboardingSlides } from "@/data/onboarding";
import { colors, spacing } from "@/lib/theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
export const ONBOARDING_STORAGE_KEY = "hasCompletedOnboarding";

export default function OnboardingScreen() {
  const posthog = usePostHog();
  const listRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboardingSlides.length - 1;

  useEffect(() => {
    posthog?.capture("onboarding_viewed", { total_slides: onboardingSlides.length });
  }, [posthog]);

  async function finishOnboarding(reason: "completed" | "skipped") {
    posthog?.capture(reason === "completed" ? "onboarding_completed" : "onboarding_skipped", {
      last_slide_index: activeIndex,
    });
    await AsyncStorage.setItem(ONBOARDING_STORAGE_KEY, "true");
    router.replace("/(tabs)");
  }

  function handleNext() {
    if (isLastSlide) {
      finishOnboarding("completed");
      return;
    }
    listRef.current?.scrollToIndex({ index: activeIndex + 1 });
  }

  function handleScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const index = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setActiveIndex(index);
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.skipButton} onPress={() => finishOnboarding("skipped")} hitSlop={8}>
        <Text style={styles.skipText}>Skip</Text>
      </Pressable>

      <FlatList
        ref={listRef}
        data={onboardingSlides}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <View style={styles.iconCircle}>
              <Ionicons name={item.icon} size={64} color={colors.primary} />
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
      />

      <View style={styles.footer}>
        <View style={styles.dots}>
          {onboardingSlides.map((slide, index) => (
            <View
              key={slide.key}
              style={[styles.dot, index === activeIndex && styles.dotActive]}
            />
          ))}
        </View>
        <Button
          label={isLastSlide ? "Get Started" : "Next"}
          onPress={handleNext}
          style={styles.nextButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  skipButton: {
    position: "absolute",
    top: spacing.xl,
    right: spacing.lg,
    zIndex: 1,
    padding: spacing.sm,
  },
  skipText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textMuted,
  },
  slide: {
    width: SCREEN_WIDTH,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xl,
    gap: spacing.md,
  },
  iconCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.text,
    textAlign: "center",
  },
  description: {
    fontSize: 15,
    color: colors.textMuted,
    textAlign: "center",
    lineHeight: 22,
  },
  footer: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: spacing.xs,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
  },
  dotActive: {
    backgroundColor: colors.primary,
    width: 20,
  },
  nextButton: {
    width: "100%",
  },
});
