import SearchContext from "@/contexts/SearchContext";
import { useDataSources } from "@/data-source";
import { use } from "react";
import ArticleCard from "./ArticleCard";

const Results: React.FC = () => {
  //magic happens here :)
  useDataSources();
  const { streaming, results, isLoading } = use(SearchContext)!;

  const items = isLoading ? streaming : results;
  //react table here

  console.log({ streaming, results });

  return (
    <>
      <div className="bg bg-base-400 flex w-full justify-between">
        Table sorting + page size + here
      </div>
      <div className="bg bg-base-400 flex w-full justify-between">
        Table pagination here
      </div>
      <div className="bg bg-base-400 lg:grid-cols- flex grid w-full grid-cols-1 justify-between gap-4 overflow-y-auto md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {items.map((item) => (
          <ArticleCard key={item.uuid} article={item} skeleton={isLoading} />
        ))}
      </div>
    </>
  );
};

export default Results;
