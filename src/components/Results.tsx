import SearchContext from "@/contexts/SearchContext";
import { useDataSources } from "@/data-source";
import { use, useState } from "react";
import ArticleCard from "./ArticleCard";
import Pagination, { PaginationState } from "./Pagination";

const Results: React.FC = () => {
  //magic happens here :)
  useDataSources();
  const { streaming, results, isLoading } = use(SearchContext)!;

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const { pageIndex, pageSize } = pagination;

  const items = isLoading ? streaming : results;

  return (
    <>
      <div className="bg bg-base-400 w-full">
        <Pagination
          totalResults={items.length}
          pageIndex={pageIndex}
          pageSize={pageSize}
          setPagination={setPagination}
          disabled={isLoading}
        />
      </div>
      <div className="bg bg-base-400 flex w-full justify-center">
        <div className="grid grid-flow-row-dense grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <ArticleCard key={item.uuid} article={item} skeleton={isLoading} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Results;
