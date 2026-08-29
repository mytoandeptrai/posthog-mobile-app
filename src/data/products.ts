import type { Ionicons } from "@expo/vector-icons";

export type Category = "Electronics" | "Apparel" | "Footwear" | "Accessories";

export type Product = {
  id: string;
  name: string;
  price: number;
  category: Category;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
  description: string;
  rating: number;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones Pro",
    price: 129.99,
    category: "Electronics",
    icon: "headset-outline",
    color: "#2563EB",
    description:
      "Over-ear wireless headphones with active noise cancellation and 30-hour battery life.",
    rating: 4.6,
  },
  {
    id: "2",
    name: "Smart Watch X1",
    price: 199.99,
    category: "Electronics",
    icon: "watch-outline",
    color: "#0891B2",
    description:
      "Fitness tracking smartwatch with heart-rate monitor, GPS, and week-long battery life.",
    rating: 4.4,
  },
  {
    id: "3",
    name: "Classic Runner Sneakers",
    price: 89.99,
    category: "Footwear",
    icon: "footsteps-outline",
    color: "#EA580C",
    description:
      "Lightweight everyday sneakers with cushioned soles, built for all-day comfort.",
    rating: 4.2,
  },
  {
    id: "4",
    name: "Everyday Backpack",
    price: 59.99,
    category: "Accessories",
    icon: "bag-handle-outline",
    color: "#7C3AED",
    description:
      "Water-resistant 20L backpack with a padded laptop sleeve and multiple compartments.",
    rating: 4.7,
  },
  {
    id: "5",
    name: "Cotton Crew T-Shirt",
    price: 24.99,
    category: "Apparel",
    icon: "shirt-outline",
    color: "#16A34A",
    description: "Soft, breathable 100% cotton t-shirt in a relaxed fit.",
    rating: 4.1,
  },
  {
    id: "6",
    name: "Polarized Sunglasses",
    price: 44.99,
    category: "Accessories",
    icon: "glasses-outline",
    color: "#D97706",
    description:
      "UV400 polarized lenses with a durable, lightweight frame for everyday wear.",
    rating: 4.3,
  },
  {
    id: "7",
    name: "Insulated Water Bottle",
    price: 29.99,
    category: "Accessories",
    icon: "water-outline",
    color: "#0D9488",
    description:
      "Double-wall stainless steel bottle that keeps drinks cold for 24 hours.",
    rating: 4.8,
  },
  {
    id: "8",
    name: "Compact Digital Camera",
    price: 349.99,
    category: "Electronics",
    icon: "camera-outline",
    color: "#DB2777",
    description:
      "20MP compact camera with 4x optical zoom, ideal for travel photography.",
    rating: 4.5,
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}
