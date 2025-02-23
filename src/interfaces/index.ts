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
  updateCategories: (category: Iterable<Category>) => void;
  updateSources: (source: Iterable<Source>) => void;
  updateAuthors: (author: Iterable<Author>) => void;
  updateMetadata: (articles: Article[]) => void;
}

/**
 * Where the magic happens
 */
export interface Article extends NewsApiArticle {
  uuid: string;
  authors: string[];
  keywords: string[];
}

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
   */
  results: Article[];

  /**
   * Income results from various sources
   */
  streaming: Article[];

  /**
   * The function called used by providers to pass its results
   * @param values The transformed payload from each provider
   */
  setArticles: React.Dispatch<React.SetStateAction<Article[]>>;

  /**
   * The function called used by providers to pass its results
   * @param values The transformed payload from each provider
   */
  setStreaming: React.Dispatch<React.SetStateAction<Article[]>>;

  /**
   * Use this to update search arguments from within context
   */
  setSearchArguments: React.Dispatch<React.SetStateAction<SearchArgs>>;

  /**
   * Signal loading state when complete
   */
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
