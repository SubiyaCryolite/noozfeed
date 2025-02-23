import { Category } from "@/interfaces";

export const DEFAULT_CATEGORIES: Category[] = [
  { value: "news", label: "News" },
  { value: "entertainment", label: "Entertainment" },
  { value: "technology", label: "Technology" },
  { value: "travel", label: "Travel" },
  { value: "food", label: "Food" },
  { value: "sports", label: "Sports" },
];

export type TAB_TYPE = "for_you" | "live_feed";
