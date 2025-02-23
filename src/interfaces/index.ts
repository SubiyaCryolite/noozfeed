export interface Option {
  value: string;
  label: string;
}

export type Source = Option;

export type Category = Option;

export type Author = Option;

export interface AppPreferences {
  sources: Source[];
  categories: Category[];
  authors: Author[];
}

export interface Filter {
  total: number;
  values: Set<string>;
}

/**
 * These are the personalizaed subest that will be persisted
 */
export interface SerializableArgs {
  sources: Filter;
  categories: Filter;
  authors: Filter;
}

/**
 * Must match the property names above
 */
export type FilterType = "sources" | "categories" | "authors";

export interface SearchArgs extends SerializableArgs {
  searcthText: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
}

export interface AppContextType extends AppPreferences {
  updateCategories: (category: Category) => void;
  updateSources: (category: Category) => void;
  updateAuthors: (author: Author) => void;
}
