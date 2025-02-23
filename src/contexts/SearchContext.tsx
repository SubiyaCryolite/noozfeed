import { createContext, SetStateAction } from "react";
import { SearchContextType, Article, SearchArgs } from "@/interfaces";

const fallback: SearchContextType = {
  isLoading: false,
  searchArguments: {
    searcthText: "",
    sources: {},
    categories: {},
    authors: {},
  },
  results: [],
  setIsLoading: function (value: SetStateAction<boolean>): void {
    throw new Error(`Function [setIsLoading] not implemented. ${value}`);
  },
  setSearchArguments: function (value: SetStateAction<SearchArgs>): void {
    throw new Error(`Function [setSearchArguments] not implemented. ${value}`);
  },
  setArticles: function (value: SetStateAction<Article[]>): void {
    throw new Error(`Function [setArticles] not implemented. ${value}`);
  },
};

const SearchContext = createContext<SearchContextType>(fallback);

export default SearchContext;
