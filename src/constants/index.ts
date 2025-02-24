import { Category } from "@/interfaces";

export const DEFAULT_CATEGORIES: Category[] = [
  { value: "news", label: "News" },
  { value: "entertainment", label: "Entertainment" },
  { value: "technology", label: "Technology" },
  { value: "travel", label: "Travel" },
  { value: "food", label: "Food" },
  { value: "sports", label: "Sports" },
  { value: "football", label: "Football" },
  { value: "politics", label: "Politics" },
  { value: "music", label: "Music" },
];

/**
 * TODO move to enums
 */
export enum FeedType {
  You = "for_you",
  Live = "live_feed",
}
