import { cn } from "@/utils";
import ChevronLastIcon from "@heroicons/react/24/outline/ChevronDoubleRightIcon";
import ChevronRightIcon from "@heroicons/react/24/outline/ChevronRightIcon";
import ChevronFirstIcon from "@heroicons/react/24/outline/ChevronDoubleLeftIcon";
import ChevronLeftIcon from "@heroicons/react/24/outline/ChevronLeftIcon";

export interface PaginationState {
  pageIndex: number;
  pageSize: number;
}

export interface PaginationProps extends React.HTMLProps<HTMLDivElement> {
  pageIndex?: number;
  pageSize?: number;
  totalResults?: number;
  setPagination?: React.Dispatch<React.SetStateAction<PaginationState>>;
  onNext?: () => void;
  onPrev?: () => void;
  onFirst?: () => void;
  onLast?: () => void;
}

interface NavigationStatus {
  canGoNext: boolean;
  canGoLast: boolean;
  canGoPrevious: boolean;
  canGoFirst: boolean;
}

export const getNavigationStatus = (
  pageIndex: number,
  pageSize: number,
  totalResults: number,
): NavigationStatus => {
  if (pageIndex < 0 || pageSize <= 0 || totalResults < 0) {
    throw new Error("Invalid input values");
  }

  const totalPages = Math.ceil(totalResults / pageSize);

  return {
    canGoNext: pageIndex < totalPages - 1,
    canGoLast: pageIndex < totalPages - 1,
    canGoPrevious: pageIndex > 0,
    canGoFirst: pageIndex > 0,
  };
};

//TODO use imported SVG icons.
const Pagination: React.FC<PaginationProps> = ({
  className,
  disabled,
  pageIndex = 0,
  pageSize = 50,
  totalResults = 0,
  setPagination,
  onNext,
  onPrev,
  onFirst,
  onLast,
  ref,
  ...props
}) => {
  let startItem = 0;
  let endItem = 0;

  if (totalResults > 0) {
    startItem = pageIndex * pageSize + 1;
    endItem = Math.min((pageIndex + 1) * pageSize, totalResults);
  }

  const { canGoFirst, canGoLast, canGoNext, canGoPrevious } =
    getNavigationStatus(pageIndex, pageSize, totalResults);

  return (
    <div
      className={cn(
        "flex items-center justify-between border-t border-gray-200 bg-white py-3",
        className,
      )}
      aria-label="Pagination control"
      ref={ref}
      {...props}
    >
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={onPrev}
          disabled={disabled || !canGoPrevious}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </button>
        <button
          onClick={onNext}
          disabled={disabled || !canGoNext}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <span className="flex items-center gap-1">
            Page Size:
            <select
              disabled={disabled}
              className="rounded-md p-1"
              value={pageSize}
              aria-label="Page options"
              onChange={(event) => {
                setPagination?.((prevState) => ({
                  ...prevState,
                  pageSize: parseInt(event.target.value),
                }));
              }}
            >
              {[10, 20, 40, 50, 75].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </span>
        </div>

        <div>
          <p className="text-sm text-gray-700">
            {Boolean(totalResults) && (
              <>
                Showing&nbsp;
                <span className="font-medium">{startItem}</span>
                &nbsp;to&nbsp;
                <span className="font-medium">{endItem}</span>
                &nbsp;of&nbsp;
              </>
            )}
            <span className="font-medium">{totalResults}</span>
            &nbsp;results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-xs"
            aria-label="Pagination"
          >
            <button
              onClick={onFirst}
              disabled={disabled || !canGoFirst}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">First</span>
              <ChevronFirstIcon className="size-4" />
            </button>
            <button
              onClick={onPrev}
              disabled={disabled || !canGoPrevious}
              className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="size-4" />
            </button>
            <span
              aria-current="page"
              className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {pageIndex + 1}
            </span>
            <button
              onClick={onNext}
              disabled={disabled || !canGoNext}
              className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="size-4" />
            </button>
            <button
              onClick={onLast}
              disabled={disabled || !canGoLast}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Last</span>
              <ChevronLastIcon className="size-4" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
