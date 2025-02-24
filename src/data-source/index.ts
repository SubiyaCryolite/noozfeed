import { use, useEffect } from "react";
import SearchContext from "@/contexts/SearchContext";
import {
  getNewsApiTransformer,
  getNewsApiUrl,
  NewsApiDataSource,
} from "./news-api";
import {
  getGuardianTransformer,
  getGuardianUrl,
  GuardianDataSource,
} from "./guardian";
import useExternalSource from "./base";
import { NewsApiResults } from "@/interfaces/external/news-api";
import { GuardianResults } from "@/interfaces/external/guardian";
import { NytResults } from "@/interfaces/external/nyt";
import { NytDataSource, getNytTransformer, getNytUrl } from "./nyt";

export const useDataSources = () => {
  const { setArticles, streaming, setIsLoading } = use(SearchContext)!;

  const isNewsApiDone = useExternalSource<NewsApiResults>(
    NewsApiDataSource,
    getNewsApiUrl,
    getNewsApiTransformer,
  );

  const isGuardianDone = useExternalSource<GuardianResults>(
    GuardianDataSource,
    getGuardianUrl,
    getGuardianTransformer,
  );

  const isNytSource = useExternalSource<NytResults>(
    NytDataSource,
    getNytUrl,
    getNytTransformer,
  );

  useEffect(() => {
    const allComplete = isGuardianDone && isNewsApiDone && isNytSource;
    if (allComplete) {
      setIsLoading(false);
      setArticles(streaming);
    }
  }, [
    setIsLoading,
    setArticles,
    streaming,
    isNewsApiDone,
    isGuardianDone,
    isNytSource,
  ]);
};
