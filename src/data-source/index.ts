import { SearchContextType } from "@/interfaces";
import { useEffect } from "react";
import { useTestSource } from "./test";

export const useDataSources = (payload: SearchContextType) => {
  const { setArticles, streaming, setIsLoading } = payload;

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
