import React, { useCallback, useMemo, useState } from "react";
import { AppContextType, Author, Category, Option, Source } from "@/interfaces";
import AppContext from "@/contexts/AppContext";
import { DEFAULT_CATEGORIES } from "@/constants";

interface AppProviderProps {
  children: React.ReactNode;
}

const sortOptions = (a: Option, b: OPtion): number => {
  if (a.label < b.label) {
    return -1;
  }
  if (a.label > b.label) {
    return 1;
  }
  return 0;
};

const update = (
  option: Option,
  setState: React.Dispatch<React.SetStateAction<Option[]>>,
) => {
  setState?.((prevState) => {
    const exists = prevState.findIndex((entry) => (option.value = entry.value));
    if (exists < 0) {
      return [...prevState, option].sort(sortOptions);
    } else {
      return prevState;
    }
  });
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [sources, setSources] = useState<Source[]>([]);
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);
  const [authors, setAuthors] = useState<Author[]>([]);

  const updateCategories = useCallback((category: Category) => {
    update(category, setCategories);
  }, []);

  const updateSources = useCallback((source: Source) => {
    update(source, setSources);
  }, []);

  const updateAuthors = useCallback((author: Author) => {
    update(author, setAuthors);
  }, []);

  const payload = useMemo<AppContextType>(
    () => ({
      sources,
      categories,
      authors,
      updateSources,
      updateCategories,
      updateAuthors,
    }),
    [
      sources,
      categories,
      authors,
      updateSources,
      updateCategories,
      updateAuthors,
    ],
  );

  return <AppContext value={payload}>{children}</AppContext>;
};

export default AppProvider;
