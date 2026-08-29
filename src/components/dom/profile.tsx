"use dom";

import "@/global.css";
import { IS_DOM } from "expo/dom";
import { useGlobalButtonHaptics } from "../global-button-haptics";

type User = {
  id: string;
  email: string;
  name: string;
  plan: string;
};

type Props = {
  user: User;
  isLoggedIn: boolean;
  onLogin: () => Promise<void>;
  onLogout: () => Promise<void>;
  onButtonClick: (size: number) => Promise<void>;
  ref?: import("react").RefObject<import("react-native-webview").WebView | null>;
  dom?: import("expo/dom").DOMProps;
};

export default function Profile({
  user,
  isLoggedIn,
  onLogin,
  onLogout,
  onButtonClick,
}: Props) {
  useGlobalButtonHaptics(onButtonClick);

  return (
    <main
      style={{ minHeight: "100vh" }}
      className={`flex w-full flex-col p-4 pt-8 md:p-6 bg-background ${
        IS_DOM ? "animate-fade-in" : ""
      }`}
    >
      <div className="mx-auto flex w-full max-w-md flex-col gap-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-1 border-b border-border pb-4">
          <h1 className="text-2xl font-bold text-card-foreground">User Profile</h1>
          <p className="text-xs text-muted-foreground">
            Manage your account status and PostHog identity
          </p>
        </div>

        <div className="flex flex-col gap-3 rounded-xl bg-muted/50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Status:</span>
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                isLoggedIn
                  ? "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {isLoggedIn ? "Logged In" : "Anonymous"}
            </span>
          </div>

          {isLoggedIn && (
            <>
              <div className="flex items-center justify-between border-t border-border/50 pt-2">
                <span className="text-sm font-medium text-muted-foreground">Name:</span>
                <span className="text-sm font-semibold text-card-foreground">{user.name}</span>
              </div>
              <div className="flex items-center justify-between border-t border-border/50 pt-2">
                <span className="text-sm font-medium text-muted-foreground">Email:</span>
                <span className="text-sm font-semibold text-card-foreground">{user.email}</span>
              </div>
              <div className="flex items-center justify-between border-t border-border/50 pt-2">
                <span className="text-sm font-medium text-muted-foreground">Plan:</span>
                <span className="text-sm font-semibold uppercase text-primary">{user.plan}</span>
              </div>
            </>
          )}
        </div>

        <div className="pt-2">
          {isLoggedIn ? (
            <button
              onClick={() => onLogout()}
              className="w-full rounded-xl bg-destructive py-3 text-sm font-semibold text-destructive-foreground transition-colors hover:bg-destructive/90"
            >
              Log out
            </button>
          ) : (
            <button
              onClick={() => onLogin()}
              className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Log in as demo user
            </button>
          )}
        </div>
      </div>
    </main>
  );
}