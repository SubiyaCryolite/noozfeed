import { use, useRef, useEffect, useState } from "react";
import axios from "axios";

import AppContext from "@/contexts/AppContext";
import SearchContext from "@/contexts/SearchContext";
import { Article, SearchArgs } from "@/interfaces";

export const useExternalSource = <T>(
  dataSource: {
    value: string;
    label: string;
  },
  getUrl: (searchArguments: SearchArgs) => string | undefined,
  transformer: (data: T) => Article[],
) => {
  const { filters, setStreaming } = use(SearchContext)!;
  const { updateSources, updateMetadata } = use(AppContext)!;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const abortControllerRef = useRef<AbortController>(null);
  const key = getUrl(filters);

  useEffect(() => {
    setIsLoading(true);
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;

    if (key) {
      axios
        .get<T>(key, {
          signal,
        })
        .then((response) => {
          const articles = transformer(response.data);
          updateMetadata(articles);
          setStreaming((prevState) => [...prevState, ...articles]);
        })
        .catch((err) => {
          if (axios.isCancel(err)) {
            console.log("Request canceled", err.message);
          } else {
            //toastrsetError(err);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [key, setStreaming, updateMetadata, transformer]);

  /**
   * Cleanup
   */
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  /**
   * register this source
   */
  useEffect(() => {
    updateSources([dataSource]);
  }, [updateSources, dataSource]);

  return !isLoading;
};

export default useExternalSource;
