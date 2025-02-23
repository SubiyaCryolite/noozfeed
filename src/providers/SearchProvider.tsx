import React, { useEffect, useMemo, useState } from "react";
import { SearchContextType, SearchArgs, Article } from "@/interfaces";
import SearchContext from "@/contexts/SearchContext";
import { FeedType } from "@/constants";
import { getDefaultValue, saveArgs } from "@/utils";

interface SearchProviderProps {
  children: React.ReactNode;
  type: FeedType;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({
  children,
  type,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState<SearchArgs>(getDefaultValue(type));
  const [results, setArticles] = useState<Article[]>([]);
  const [streaming, setStreaming] = useState<Article[]>([]);

  useEffect(() => {
    setIsLoading(true);
    setArticles([]);
    if (type === FeedType.You) {
      saveArgs(filters);
    }
  }, [filters, type]);

  const payload = useMemo<SearchContextType>(
    () => ({
      isLoading,
      filters,
      setFilters,
      results,
      streaming,
      setArticles,
      setStreaming,
      setIsLoading,
    }),
    [results, isLoading, filters, setFilters, streaming],
  );

  return <SearchContext value={payload}>{children}</SearchContext>;
};

export default SearchProvider;
