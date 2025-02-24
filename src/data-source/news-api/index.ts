import { use, useEffect } from "react";
import useSWR from "swr";

import AppContext from "@/contexts/AppContext";
import SearchContext from "@/contexts/SearchContext";
import { Article, SearchArgs } from "@/interfaces";
import { canUseSource, fetcher, getArticle } from "@/utils";
import { NewsApiResults } from "@/interfaces/external/news-api";

const DataSourceName = "news.api";
const DEV_KEY = "021aa853b901466f9c87b5c27b561db1";

export const useNewsApiSource = () => {
  const { filters, setStreaming } = use(SearchContext)!;
  const { updateSources, updateMetadata } = use(AppContext)!;

  const { data, isLoading } = useSWR<NewsApiResults>(
    getUrlKey(filters),
    fetcher,
  );

  //register this source, happens once
  useEffect(() => {
    updateSources([{ value: DataSourceName, label: "News API" }]);
  }, [updateSources]);

  useEffect(() => {
    if (data) {
      const articles: Article[] = transform(data);
      updateMetadata(articles);
      setStreaming((prevState) => [...prevState, ...articles]);
    }
  }, [data, setStreaming, updateMetadata]);

  return !isLoading;
};

export default useNewsApiSource;

const getUrlKey = (filters: SearchArgs): string | undefined => {
  if (!canUseSource(filters.sources, DataSourceName)) {
    return undefined;
  }
  if (!filters.searcthText?.length) {
    return undefined; //invalid args
  }

  const url = new URL("https://newsapi.org/v2/everything");
  if (filters.searcthText.length) {
    url.searchParams.append("q", filters.searcthText);
  }
  if (filters.startDate) {
    url.searchParams.append("from", filters.startDate.toISOString());
  }
  if (filters.endDate) {
    url.searchParams.append("to", filters.endDate.toISOString());
  }
  //TODO add publications filter for sources
  /**
   * sources
   * A comma-seperated string of identifiers (maximum 20) for the news sources or blogs you want headlines from. Use the /sources endpoint to locate these programmatically or look at the sources index.
   */

  if (url.searchParams.size === 0) {
    return undefined;
  }
  url.searchParams.append("apiKey", DEV_KEY);
  url.searchParams.append("pageSize", "10");
  url.searchParams.append("sortBy", "publishedAt");
  return url.toString();
};

const transform = (data: NewsApiResults): Article[] => {
  const results: Article[] = [];
  data.articles?.forEach((result) => {
    const article = getArticle();
    article.uuid = `${result.publishedAt}-${DataSourceName}-${result.title}`;
    article.description = result.description;
    article.title = result.title;
    article.publishedAt = result.publishedAt;
    article.urlToImage = result.urlToImage;
    article.publication.id = result.source.id ?? result.source.name;
    article.publication.name = result.source.name;
    if (result.author) article.authors.push(result.author);
    results.push(article);
  });
  return results;
};
