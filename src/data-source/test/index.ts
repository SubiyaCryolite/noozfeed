import { use, useEffect } from "react";
import useSWR from "swr";

import AppContext from "@/contexts/AppContext";
import SearchContext from "@/contexts/SearchContext";
import { Article, SearchArgs } from "@/interfaces";
import { NpmResults } from "@/interfaces/external";
import { canUseSource, fetcher, getArticle } from "@/utils";

const DataSourceName = "Test";

export const useTestSource = () => {
  const { searchArguments, setStreaming } = use(SearchContext)!;
  const { updateSources, updateMetadata } = use(AppContext)!;

  const { data, isLoading } = useSWR<NpmResults>(
    getUrlKey(searchArguments),
    fetcher,
  );

  //register this source, happens once
  useEffect(() => {
    updateSources([{ value: DataSourceName, label: "Test Source" }]);
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

const getUrlKey = (searchArguments: SearchArgs): string | undefined => {
  if (!canUseSource(searchArguments.sources, DataSourceName)) {
    return undefined;
  }
  if (!searchArguments.searcthText?.length) {
    return undefined; //invalid args
  }

  const url = new URL("https://api.npms.io/v2/search");
  url.searchParams.append("q", searchArguments.searcthText);
  return url.toString();
};

const transform = (data: NpmResults): Article[] => {
  const results: Article[] = [];
  console.log({ data });
  data.results?.forEach((result) => {
    const article = getArticle();
    article.source.name = DataSourceName;
    article.description = result.package.description;
    article.title = result.package.name;
    article.publishedAt = result.package.date;
    result.package.maintainers?.forEach(({ username, email }) => {
      article.authors.push(`${username} <${email}>`);
    });
    result.package.keywords?.forEach((keyword) => {
      article.keywords.push(keyword);
    });
    results.push(article);
  });
  return results;
};
