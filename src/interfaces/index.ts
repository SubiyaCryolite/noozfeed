import { NewsApiArticle } from "./external";

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
  sources: Record<string, boolean>;
  categories: Record<string, boolean>;
  authors: Record<string, boolean>;
}

/**
 * Must match the property names above
 */
export type FilterType = "sources" | "categories" | "authors";

export interface SearchArgs extends SerializableArgs {
  searcthText?: string;
  startDate?: Date | undefined;
  endDate?: Date | undefined;
}

export interface AppContextType extends AppPreferences {
  updateCategories: (category: Category) => void;
  updateSources: (category: Category) => void;
  updateAuthors: (author: Author) => void;
}

/**
 * Where the magic happens
 */
export type Article = NewsApiArticle;

export interface SearchContextType {
  /**
   * Indicates if a search event is occuring. COntrolled internally by [signals] and [signal]
   */
  isLoading: boolean;

  /**
   * The search arguments that will trigger a search on modification #useEffect
   */
  searchArguments: SearchArgs;

  /**
   * The aggregated results that will be PAGINATED and SORTED client side
   * TODO consider adding previousResults as a display placeholder while new data loads
   */
  results: Article[];

  // /**
  //  * The object used to let the context know that all providers are done fetching
  //  */
  // signals: Record<string, boolean>;

  // /**
  //  * The function called by each data provider when it has completed its call
  //  * @param provider the data source
  //  * @param completed completed value
  //  */
  // signal: (provider: string, completed: boolean) => void;

  /**
   * The function called used by providers to pass its results
   * @param values The transformed payload from each provider
   */
  setArticles: React.Dispatch<React.SetStateAction<Article[]>>;

  /**
   * Use this to update search arguments from within context
   */
  setSearchArguments: React.Dispatch<React.SetStateAction<SearchArgs>>;

  /**
   * Signal loading state when complete
   */
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
