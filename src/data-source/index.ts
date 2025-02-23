import { use, useEffect } from "react";
import { useTestSource } from "./test";
import SearchContext from "@/contexts/SearchContext";

export const useDataSources = () => {
  const { setArticles, streaming, setIsLoading } = use(SearchContext)!;

  const isTestDone = useTestSource();
  // TODO const isBbcDone = useTestSource();
  // TODO const isNytDone = useTestSource();
  // TODO const isNewsApiDone = useTestSource();

  useEffect(() => {
    const allComplete = isTestDone;
    if (allComplete) {
      setIsLoading(false);
      setArticles(streaming);
    }
  }, [setIsLoading, setArticles, streaming, isTestDone]);
};
