import AppContext from "@/contexts/AppContext";
import SearchContext from "@/contexts/SearchContext";
import { Article, SearchArgs } from "@/interfaces";
import { NpmResults } from "@/interfaces/external";
import { canUseSource, fetcher, getArticle } from "@/utils";
import { use, useEffect } from "react";
import useSWR from "swr";

const DataSourceName = "Test";

export const useTestSource = () => {
  const { searchArguments, setStreaming } = use(SearchContext);
  const { updateSources } = use(AppContext);

  const { data, isLoading } = useSWR<NpmResults>(
    getUrlKey(searchArguments),
    fetcher,
  );

  //register this source, happens once
  useEffect(() => {
    updateSources({ value: DataSourceName, label: "Test Source" });
  }, [updateSources]);

  useEffect(() => {
    if (data) {
      const articles: Article[] = transform(data);
      setStreaming((prevState) => [...prevState, ...articles]);
    }
  }, [data, setStreaming]);

  return !isLoading;
};

function getUrlKey(searchArguments: SearchArgs): string | undefined {
  if (!canUseSource(searchArguments.sources, DataSourceName)) {
    return undefined;
  }

  const url = new URL("https://api.npms.io/v2/search");
  if (searchArguments.searcthText)
    url.searchParams.append("q", searchArguments.searcthText);
  return url.toString();
}

function transform(data: NpmResults): Article[] {
  const results: Article[] = [];
  data.results.forEach((result) => {
    const article = getArticle();
    article.keywords = [...result.package.keywords];
    results.push(article);
  });
  return results;
}
