import { use, useEffect } from "react";
import { TestDataSource, getTestTransformer, getTestUrl } from "./test";
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
import { NpmResults } from "@/interfaces/external";
import { NewsApiResults } from "@/interfaces/external/news-api";
import { GuardianResults } from "@/interfaces/external/guardian";

export const useDataSources = () => {
  const { setArticles, streaming, setIsLoading } = use(SearchContext)!;

  const isTestDone = useExternalSource<NpmResults>(
    TestDataSource,
    getTestUrl,
    getTestTransformer,
  );

  // const isNewsApiDone = useExternalSource<NewsApiResults>(
  //   NewsApiDataSource,
  //   getNewsApiUrl,
  //   getNewsApiTransformer,
  // );

  const isGuardianDone = useExternalSource<GuardianResults>(
    GuardianDataSource,
    getGuardianUrl,
    getGuardianTransformer,
  );

  useEffect(() => {
    const allComplete = isGuardianDone && isTestDone;
    console.log({ isGuardianDone, isTestDone });
    if (allComplete) {
      setIsLoading(false);
      setArticles(streaming);
    }
  }, [setIsLoading, setArticles, streaming, isTestDone, isGuardianDone]);
};
