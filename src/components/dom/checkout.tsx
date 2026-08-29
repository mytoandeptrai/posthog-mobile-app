"use dom";

import "@/global.css";
import { IS_DOM } from "expo/dom";
import { useGlobalButtonHaptics } from "../global-button-haptics";

type CartItem = {
  name: string;
  price: number;
};

type Props = {
    cartItem: CartItem;
    isCheckoutV2: boolean;
    addedToCart: boolean;
    purchased: boolean;
    onAddToCart: () => Promise<void>;
    onPurchase: () => Promise<void>;
    onButtonClick: (size: number) => Promise<void>;
    ref?: import("react").RefObject<import("react-native-webview").WebView | null>;
    dom?: import("expo/dom").DOMProps;
  };

export default function Checkout({
  cartItem,
  isCheckoutV2,
  addedToCart,
  purchased,
  onAddToCart,
  onPurchase,
  onButtonClick,
}: Props) {
  useGlobalButtonHaptics(onButtonClick);

  return (
    <main className={`flex flex-1 flex-col p-4 md:p-6${IS_DOM ? " animate-fade-in" : ""}`}>
      <div className="mx-auto flex w-full max-w-md flex-col gap-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-1 border-b border-border pb-4">
          <span className="text-xs font-medium text-muted-foreground">
            Flag checkout-flow-v2:{" "}
            <span className={isCheckoutV2 ? "font-semibold text-emerald-600" : "text-muted-foreground"}>
              {isCheckoutV2 ? "on (variant)" : "off (control)"}
            </span>
          </span>
          <h1 className="text-2xl font-bold text-card-foreground">Order Summary</h1>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-muted/50 p-4">
          <div>
            <p className="font-semibold text-card-foreground">{cartItem.name}</p>
            <p className="text-sm text-muted-foreground">Quantity: 1</p>
          </div>
          <p className="text-lg font-bold text-card-foreground">
            ${cartItem.price.toFixed(2)}
          </p>
        </div>

        {purchased ? (
          <div className="rounded-xl bg-emerald-500/10 p-4 text-center text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
            <p className="font-semibold">Purchase completed!</p>
            <p className="text-sm">Thank you for your order.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3 pt-2">
            <button
              onClick={async () => await onAddToCart()}
              disabled={addedToCart}
              className={`w-full rounded-xl py-3 text-sm font-semibold transition-colors ${
                addedToCart
                  ? "cursor-not-allowed bg-muted text-muted-foreground"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              }`}
            >
              {addedToCart ? "Added to cart" : "Add to cart"}
            </button>

            {addedToCart && (
              <button
                onClick={async () => await onPurchase()}
                className={`w-full rounded-xl py-3 text-sm font-semibold transition-colors ${
                  isCheckoutV2
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                {isCheckoutV2 ? "Confirm & pay" : "Buy now"}
              </button>
            )}
          </div>
        )}
      </div>
    </main>
  );
}