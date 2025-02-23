import React, { useCallback, useMemo, useState } from "react";
import {
  AppContextType,
  Article,
  Author,
  Category,
  Option,
  Source,
} from "@/interfaces";
import AppContext from "@/contexts/AppContext";
import { DEFAULT_CATEGORIES } from "@/constants";

interface AppProviderProps {
  children: React.ReactNode;
}

const sortOptions = (a: Option, b: Option): number => {
  if (a.label < b.label) {
    return -1;
  }
  if (a.label > b.label) {
    return 1;
  }
  return 0;
};

const update = (
  options: Iterable<Option>,
  setState: React.Dispatch<React.SetStateAction<Option[]>>,
) => {
  setState?.((prevState) => {
    const unique: Record<string, Option> = {};
    for (const option of prevState) {
      unique[option.value] = option;
    }

    let changes = false;
    for (const option of options) {
      if (!unique[option.value]) {
        changes = true;
        unique[option.value] = option;
      }
    }
    return changes ? Object.values(unique).sort(sortOptions) : prevState;
  });
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [sources, setSources] = useState<Source[]>([]);
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);
  const [authors, setAuthors] = useState<Author[]>([]);

  const updateCategories = useCallback((category: Iterable<Category>) => {
    update(category, setCategories);
  }, []);

  const updateSources = useCallback((source: Iterable<Source>) => {
    update(source, setSources);
  }, []);

  const updateAuthors = useCallback((author: Iterable<Author>) => {
    update(author, setAuthors);
  }, []);

  const updateMetadata = useCallback(
    (articles: Article[]) => {
      const sourcedCategories = articles
        .flatMap((article) => article.keywords)
        .map((keyword) => ({ value: keyword, label: keyword }));
      if (sourcedCategories.length) updateCategories(sourcedCategories);

      const authors: Author[] = articles
        .flatMap((article) => article.authors)
        .map((author) => ({ value: author, label: author }));
      if (authors.length) updateAuthors(authors);
    },
    [updateCategories, updateAuthors],
  );

  const payload = useMemo<AppContextType>(
    () => ({
      sources,
      categories,
      authors,
      updateSources,
      updateCategories,
      updateAuthors,
      updateMetadata,
    }),
    [
      sources,
      categories,
      authors,
      updateSources,
      updateCategories,
      updateAuthors,
      updateMetadata,
    ],
  );

  return <AppContext value={payload}>{children}</AppContext>;
};

export default AppProvider;
