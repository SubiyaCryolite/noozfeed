import { use, useEffect } from "react";
import { useTestSource } from "./test";
import SearchContext from "@/contexts/SearchContext";
import useNewsApiSource from "./news-api";

export const useDataSources = () => {
  const { setArticles, streaming, setIsLoading } = use(SearchContext)!;

  const isTestDone = useTestSource();
  const isNewsApiDone = useNewsApiSource();
  // TODO const isBbcDone = useTestSource();
  // TODO const isNytDone = useTestSource();

  useEffect(() => {
    const allComplete = isTestDone && isNewsApiDone;
    console.log({ allComplete });
    if (allComplete) {
      setIsLoading(false);
      setArticles(streaming);
    }
  }, [setIsLoading, setArticles, streaming, isTestDone, isNewsApiDone]);
};
