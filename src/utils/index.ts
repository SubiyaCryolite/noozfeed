import { twMerge } from "tailwind-merge";
import clsx, { ClassValue } from "clsx";

import { SearchArgs, SerializableArgs } from "@/interfaces";
import { FeedType } from "@/constants";

const PreferenceStorageKey = "user.preferences.search.args";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const loadArgs = (): SerializableArgs => {
  const json = localStorage.getItem(PreferenceStorageKey);
  if (json) {
    return JSON.parse(json) as SerializableArgs;
  }
  return { sources: {}, categories: {}, authors: {} };
};

export const saveArgs = (value: SerializableArgs) => {
  localStorage.setItem(PreferenceStorageKey, JSON.stringify(value));
};

export const getDefaultValue = (type: FeedType): SearchArgs => {
  const defaultValue = {
    searcthText: "",
    sources: {},
    categories: {},
    authors: {},
  };
  if (type === FeedType.You) {
    const saved = loadArgs();
    defaultValue.authors = saved.authors;
    defaultValue.categories = saved.categories;
    defaultValue.sources = saved.sources;
  }
  return defaultValue;
};
