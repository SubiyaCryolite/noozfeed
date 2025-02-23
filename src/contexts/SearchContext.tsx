import { createContext } from "react";
import { SearchContextType } from "@/interfaces";

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export default SearchContext;
