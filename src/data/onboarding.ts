import type { Ionicons } from "@expo/vector-icons";

export type OnboardingSlide = {
  key: string;
  title: string;
  description: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
};

export const onboardingSlides: OnboardingSlide[] = [
  {
    key: "browse",
    title: "Discover Products",
    description: "Browse a curated catalog of products built for this demo shop.",
    icon: "storefront-outline",
  },
  {
    key: "checkout",
    title: "Add to Cart & Checkout",
    description: "Add items to your cart and complete a full mock checkout — no real payment needed.",
    icon: "bag-check-outline",
  },
  {
    key: "analytics",
    title: "Powered by PostHog",
    description: "Every screen view, click, and purchase is tracked with PostHog so you can see product analytics in action.",
    icon: "analytics-outline",
  },
];
