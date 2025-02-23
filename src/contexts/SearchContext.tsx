import { createContext } from "react";
import { SearchContextType } from "@/interfaces";

const getValue = (): SearchContextType => {
  throw new Error("Error. Must be called from within a valid context provider");
};

const SearchContext = createContext<SearchContextType>(getValue());

export default SearchContext;
