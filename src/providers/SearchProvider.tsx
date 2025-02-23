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
  const [searchArguments, setSearchArguments] = useState<SearchArgs>(
    getDefaultValue(type),
  );
  const [results, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    setIsLoading(true);
    if (type === FeedType.You) {
      saveArgs(searchArguments);
    }
  }, [searchArguments, type]);

  const payload = useMemo<SearchContextType>(
    () => ({
      isLoading,
      searchArguments,
      setSearchArguments,
      results,
      setArticles,
      setIsLoading,
    }),
    [results, isLoading, searchArguments, setSearchArguments],
  );

  return <SearchContext value={payload}>{children}</SearchContext>;
};

export default SearchProvider;
