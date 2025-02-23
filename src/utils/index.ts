import { twMerge } from "tailwind-merge";
import clsx, { ClassValue } from "clsx";
import { format, parseISO, ParseISOOptions } from "date-fns";
import { TZDate } from "@date-fns/tz";

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

export const printLocalDate = (
  date: Date,
  dateFormat = "PP",
  timeZone: string | undefined = undefined,
) => {
  if (!date) {
    throw new Error("A valid date is required.");
  }
  const zonedDate = new TZDate(date, timeZone);
  return format(zonedDate, dateFormat);
};

export const parseISODate = (
  date: string,
  options: ParseISOOptions<Date> | undefined = undefined,
) => {
  if (!date) {
    throw new Error("A valid date is required.");
  }
  return parseISO(date, options);
};
