# my-app

An [Expo Router](https://docs.expo.dev/router/introduction/) app with a tab-based dashboard/orders/products flow. Screens on native use React Native + `expo-router`, while their content is rendered via [Expo DOM Components](https://docs.expo.dev/guides/dom-components) so the UI can be built once with React DOM and [shadcn/ui](https://ui.shadcn.com/) (Tailwind CSS v4).

## Stack

- **Expo SDK 54** (`expo-router`, `expo-dev-client`) — see `AGENTS.md`, docs pinned to [v54](https://docs.expo.dev/versions/v54.0.0/)
- **React 19** / **React Native 0.81** / **React Native Web**
- **DOM Components** (`"use dom"`) for shadcn-styled screens — Tailwind, PostCSS, autoprefixer configured for the `/src` root
- **PostHog** (`posthog-react-native`) for analytics/session replay
- **Recharts**, **@tanstack/react-table**, **@dnd-kit** for the dashboard's charts, tables, and drag-and-drop

## Project structure

```
src/
  app/                          # expo-router routes
    _layout.tsx                 # root Tabs layout (Dashboard / Orders / Products) + PostHog init
    _layout.web.tsx             # web-specific root layout
    (index,orders,products)/    # shared array-group: one Stack layout for all three tabs
      _layout.tsx                #   picks the active tab's Stack + shared modals
      index.tsx | orders.tsx | products.tsx  # tab entry screens
      checkout.tsx | profile.tsx | alert.tsx  # modal/formSheet screens
  components/
    dom/                        # "use dom" screens (dashboard, orders, products, checkout, profile, shad-nav/layout)
    ui/                         # shadcn/ui primitives (button, card, table, sidebar, sheet, ...)
    *.tsx                       # native-facing helpers (screen-header, global-button-haptics, ...)
  data/data.json                 # sample data for the dashboard/table
  hooks/, lib/                   # shared hooks and utils (cn/tailwind-merge, etc.)
  global.css                     # Tailwind entrypoint for DOM components
```

## Getting started

```sh
pnpm install
cp .env.example .env   # fill in EXPO_POSTHOG_API_KEY / EXPO_POSTHOG_HOST if you want analytics
pnpm start              # or: pnpm ios / pnpm android / pnpm web
```

Adding a new shadcn component follows the standard CLI: `npx shadcn@latest add accordion`.

## Deploy

Deploy on all platforms with Expo Application Services (EAS):

- Website: `npx eas-cli deploy` — [docs](https://docs.expo.dev/eas/hosting/get-started/)
- iOS/Android: `npx eas-cli build` — [docs](https://expo.dev/eas)
- `pnpm deploy` exports the web build and deploys it via EAS in one step.
