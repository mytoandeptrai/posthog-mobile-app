import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import { Stack, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ProfileButton } from "@/components/screen-header";
import * as Haptics from "expo-haptics";
import { usePostHog, useFeatureFlag } from "posthog-react-native";
import Checkout from "@/components/dom/checkout";

const CART_ITEM = { name: "Wireless Mouse", price: 29.99 };

export default function CheckoutRoute() {
  const posthog = usePostHog();
  const isCheckoutV2 = useFeatureFlag("checkout-flow-v2") === true;
  const [addedToCart, setAddedToCart] = useState(false);
  const [purchased, setPurchased] = useState(false);

  useEffect(() => {
    posthog?.capture("checkout_started");
  }, [posthog]);

  const handleAddToCart = async () => {
    posthog?.capture("add_to_cart_clicked", {
      item_name: CART_ITEM.name,
      value: CART_ITEM.price,
    });
    setAddedToCart(true);
  };
  
  const handlePurchase = async () => {
    posthog?.capture("purchase_completed", {
      value: CART_ITEM.price,
      currency: "USD",
      items_count: 1,
    });
    setPurchased(true);
  };

  return (
    <>
      {/* Header chuẩn giống các trang khác */}
      <Stack.Screen
        options={{
          title: "Checkout",
          headerRight: () => (
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              <Pressable onPress={() => alert("Notification menu pressed")}>
                <Ionicons name="notifications-outline" size={22} color="#333" />
              </Pressable>
              <Pressable onPress={() => router.push("/profile")}>
                <Ionicons name="person-outline" size={22} color="#333" />
              </Pressable>
              <ProfileButton />
            </View>
          ),
        }}
      />

      {/* Render DOM Component */}
      <Checkout
        cartItem={CART_ITEM}
        isCheckoutV2={isCheckoutV2}
        addedToCart={addedToCart}
        purchased={purchased}
        onAddToCart={handleAddToCart}
        onPurchase={handlePurchase}
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