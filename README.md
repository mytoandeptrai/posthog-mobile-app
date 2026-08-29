# my-app

A pure React Native [Expo Router](https://docs.expo.dev/router/introduction/) app — a small e-commerce demo built to learn how [PostHog](https://posthog.com/) product analytics works in React Native (`posthog-react-native`): screen tracking, custom events, `identify`/`reset`, and feature flags.

There is no WebView / DOM-component layer. Every screen is native (`View`, `Text`, `Pressable`, `FlatList`, ...), styled with plain `StyleSheet`. All data is local/mock — there is no backend; login and checkout are simulated with `setTimeout`.

## Stack

- **Expo SDK 54** (`expo-router`, `expo-dev-client`)
- **React 19** / **React Native 0.81**
- **PostHog** (`posthog-react-native`) — analytics, session replay, feature flags
- **React Context** for state (`CartContext`, `AuthContext`, `ToastContext`) — no external state library
- **`@react-native-async-storage/async-storage`** — required by PostHog for persistence, and used to remember whether onboarding has been completed

## App flow

```
Onboarding (first launch only) ──▶ Home / Search ──▶ Product Detail ──▶ Cart ──▶ Checkout ──▶ Home
                                        │                                              │
                                        └──▶ Profile ──▶ Login (modal)                 └─▶ replace, not push
```

- **Onboarding** (`src/app/onboarding.tsx`) shows once per device (flag stored in AsyncStorage), then routes into the tab navigator.
- **Home** and **Profile** are the two tabs (`src/app/(tabs)/`); Search, Product Detail, Cart, Checkout, and the Login modal are pushed from the root stack.
- Completing checkout uses `router.replace('/(tabs)')` so the user can't navigate Back into a finished order.

## PostHog integration

- Client + `PostHogProvider` setup: `src/app/_layout.tsx`.
- Custom events: `product_list_viewed`, `product_searched`, `product_detail_viewed`, `cart_item_added`, `checkout_started`, `order_completed`, `app_error_triggered`, `onboarding_viewed` / `onboarding_completed` / `onboarding_skipped`.
- Feature flags: `show-promo-banner` (Home banner) and `checkout-v2` (adds a discount-coupon field to Checkout) — both need to exist in your PostHog project to activate. Active flags are listed on the Profile screen.
- Identity: `login.tsx` calls `posthog.identify(...)` on demo login; Profile's Logout calls `posthog.reset()`.

## Project structure

```
src/
  app/                    # expo-router routes
    _layout.tsx            # PostHog + Auth/Cart/Toast providers, root Stack, onboarding gate
    onboarding.tsx          # first-launch intro slides
    (tabs)/                 # Home, Profile
    login.tsx | search.tsx | product/[id].tsx | cart.tsx | checkout.tsx
  context/                # CartContext, AuthContext, ToastContext
  components/             # ProductCard, CartItemRow, CartButton, ui/ (Button, Card, Badge, Input), ...
  data/                   # products.ts (mock catalog), onboarding.ts (slide content)
  lib/theme.ts            # shared colors/spacing/radius tokens
```

## Getting started

```sh
pnpm install
cp .env.example .env   # fill in EXPO_PUBLIC_POSTHOG_API_KEY / EXPO_PUBLIC_POSTHOG_HOST
pnpm start              # or: pnpm ios / pnpm android / pnpm web
```

Env vars must be prefixed `EXPO_PUBLIC_` to be readable from client code (Expo only inlines that prefix into the app/browser bundle).

To run on a physical iOS device: `npx expo run:ios --device`. This requires CocoaPods (first run downloads/resolves all native pods and can take a while) and at least one iOS Simulator runtime installed in Xcode (Settings → Components) even when targeting a real device — Expo CLI checks for one regardless.

## Deploy

Deploy on all platforms with Expo Application Services (EAS):

- Website: `npx eas-cli deploy` — [docs](https://docs.expo.dev/eas/hosting/get-started/)
- iOS/Android: `npx eas-cli build` — [docs](https://expo.dev/eas)
- `pnpm deploy` exports the web build and deploys it via EAS in one step.
