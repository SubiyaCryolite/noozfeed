import { use, useEffect, useState, useMemo } from "react";
import {
  ColumnDef,
  getPaginationRowModel,
  getSortedRowModel,
  getCoreRowModel,
  useReactTable,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import NewspaperIcon from "@heroicons/react/24/outline/NewspaperIcon";

import SearchContext from "@/contexts/SearchContext";
import { useDataSources } from "@/data-source";

import ArticleCard from "./ArticleCard";
import Pagination from "./Pagination";
import { Article } from "@/interfaces";
import { cn } from "@/utils";

const Results: React.FC = () => {
  //magic happens here :)
  useDataSources();
  const { streaming, results, isLoading, filters } = use(SearchContext)!;

  const [sorting, setSorting] = useState<SortingState>([
    { id: "publishedAt", desc: true },
  ]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 8,
  });
  const { pageIndex, pageSize } = pagination;

  //only care about filterable columns i.e date,
  const columns = useMemo<ColumnDef<Article>[]>(
    () => [
      {
        id: "publishedAt",
        accessorKey: "publishedAt",
        enableSorting: true,
      },
    ],
    [],
  );

  const count = isLoading ? streaming.length : results.length;
  const data = isLoading ? streaming : results;

  const table = useReactTable<Article>({
    data,
    columns,
    state: {
      sorting,
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    rowCount: count,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  useEffect(() => {
    setPagination((prevState) => ({ ...prevState, pageIndex: 0 }));
  }, [filters]);

  return (
    <>
      <div className="bg bg-base-400 w-full">
        <Pagination
          totalResults={count}
          pageIndex={pageIndex}
          pageSize={pageSize}
          setPagination={setPagination}
          disabled={isLoading}
          onFirst={table.firstPage}
          onLast={table.lastPage}
          onNext={table.nextPage}
          onPrev={table.previousPage}
        />
      </div>
      <div className="bg bg-base-400 flex w-full justify-center">
        {Boolean(count) && (
          <div className="grid grid-flow-row-dense grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {table.getRowModel().rows.map(({ original }) => (
              <ArticleCard
                key={original.uuid}
                article={original}
                skeleton={isLoading}
              />
            ))}
          </div>
        )}
        {!count && (
          <div className="w-fulljustify-center mt-40 flex min-h-160 flex-col items-center">
            {!isLoading && (
              <>
                <NewspaperIcon className={cn("size-40")} />
                <div>Please begin your search whenever you are ready</div>
              </>
            )}
            {isLoading && (
              <>
                <progress className="progress my-4 w-64" />
                <div>Loading</div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Results;
