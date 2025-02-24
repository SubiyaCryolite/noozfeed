import { Article, SearchArgs } from "@/interfaces";
import { canUseSource, getArticle } from "@/utils";
import { NewsApiResults } from "@/interfaces/external/news-api";

const DataSourceName = "news.api";
const DEV_KEY = "021aa853b901466f9c87b5c27b561db1";

export const NewsApiDataSource = {
  value: DataSourceName,
  label: "News API",
};

export const getNewsApiUrl = (filters: SearchArgs): string | undefined => {
  if (!canUseSource(filters.sources, DataSourceName)) {
    return undefined;
  }

  const url = new URL("https://newsapi.org/v2/everything");
  if (filters.searcthText?.length) {
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

export const getNewsApiTransformer = (data: NewsApiResults): Article[] => {
  const results: Article[] = [];
  data.articles?.forEach((result) => {
    const article = getArticle();
    article.uuid = `${result.publishedAt}-${DataSourceName}-${result.title}`;
    article.description = result.description;
    article.title = result.title;
    article.publishedAt = result.publishedAt;
    article.urlToImage = result.urlToImage;
    article.publication.value =
      (result.source.id ?? result.source.name) || "unknown";
    article.publication.label = result.source.name || "Unknown";
    if (result.author) article.authors.push(result.author);
    results.push(article);
  });
  return results;
};
