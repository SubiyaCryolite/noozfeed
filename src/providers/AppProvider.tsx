import React, { useCallback, useMemo, useState } from "react";
import {
  AppContextType,
  Article,
  Author,
  Category,
  Option,
  Publication,
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
  const [publications, setPublications] = useState<Publication[]>([]);

  const updateCategories = useCallback((category: Iterable<Category>) => {
    update(category, setCategories);
  }, []);

  const updateSources = useCallback((source: Iterable<Source>) => {
    update(source, setSources);
  }, []);

  const updateAuthors = useCallback((author: Iterable<Author>) => {
    update(author, setAuthors);
  }, []);

  const updatePublications = useCallback(
    (publications: Iterable<Publication>) => {
      update(publications, setPublications);
    },
    [],
  );

  const updateMetadata = useCallback(
    (articles: Article[]) => {
      const _categories = articles.map(({ category }) => category);
      if (_categories.length) updateCategories(_categories);

      const _authors = articles.flatMap((article) => article.authors);
      if (_authors.length) updateAuthors(_authors);

      const _publications = articles.map(({ publication }) => publication);
      if (_publications.length) updatePublications(_publications);
    },
    [updateCategories, updateAuthors, updatePublications],
  );

  const payload = useMemo<AppContextType>(
    () => ({
      sources,
      categories,
      authors,
      publications,
      updateSources,
      updateCategories,
      updateAuthors,
      updatePublications,
      updateMetadata,
    }),
    [
      sources,
      categories,
      authors,
      updateSources,
      publications,
      updatePublications,
      updateCategories,
      updateAuthors,
      updateMetadata,
    ],
  );

  return <AppContext value={payload}>{children}</AppContext>;
};

export default AppProvider;
