import { twMerge } from "tailwind-merge";
import clsx, { ClassValue } from "clsx";
import { format, parseISO, ParseISOOptions } from "date-fns";
import { TZDate } from "@date-fns/tz";
import { v4 as uuid } from "uuid";

import { Article, SearchArgs, SerializableArgs } from "@/interfaces";
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
  return { sources: {}, categories: {}, authors: {}, publications: {} };
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
    publications: {},
  };
  if (type === FeedType.You) {
    const saved = loadArgs();
    defaultValue.authors = saved.authors;
    defaultValue.categories = saved.categories;
    defaultValue.sources = saved.sources;
    defaultValue.publications = saved.publications;
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

export const fetcher = (
  input: string | URL | globalThis.Request,
  init?: RequestInit,
) => fetch(input, init).then((res) => res.json());

export const canUseSource = (
  sources: Record<string, boolean>,
  keyName: string,
): boolean => {
  if (Object.keys(sources).length === 0) return true;
  return sources[keyName];
};

export const getArticle = (): Article => ({
  uuid: uuid().toString(),
  authors: [],
  keywords: [],
  publication: {
    id: undefined,
    name: undefined,
  },
  title: undefined,
  description: undefined,
  url: undefined,
  urlToImage: undefined,
  publishedAt: undefined,
  categories: [],
});
