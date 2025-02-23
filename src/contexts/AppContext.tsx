import { createContext } from "react";
import { AppContextType, Author, Category } from "@/interfaces";

const fallback: AppContextType = {
  updateCategories: function (category: Category): void {
    throw new Error(`Function not implemented. ${category}`);
  },
  updateAuthors: function (author: Author): void {
    throw new Error(`Function not implemented. ${author}`);
  },
  updateSources: function (category: Category): void {
    throw new Error(`Function not implemented. ${category}`);
  },
  sources: [],
  categories: [],
  authors: [],
};

const AppContext = createContext<AppContextType>(fallback);

export default AppContext;
