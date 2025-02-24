import { use, useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";

import AppContext from "@/contexts/AppContext";
import SearchContext from "@/contexts/SearchContext";
import MagnifyingGlassIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import Cog8ToothIcon from "@heroicons/react/24/outline/Cog8ToothIcon";
import ArrowPathIcon from "@heroicons/react/24/outline/ArrowPathIcon";
import { cn, printLocalDate } from "@/utils";

const minDate = new Date(1900, 1, 1);
const today = new Date();

interface FilterIndicatorProps extends React.HTMLProps<HTMLDivElement> {
  label?: string;
  active?: boolean;
  circular?: boolean;
}

const FilterIndicator: React.FC<FilterIndicatorProps> = ({
  active,
  label,
  children,
  className,
  circular,
  ref,
  ...props
}) => {
  return (
    <div ref={ref} className={cn("indicator", className)} {...props}>
      <span
        className={cn(
          "indicator-item",
          { badge: !circular },
          { "badge-sm": !circular },
          { "badge-secondary": !circular },
          { status: circular },
          { "status-secondary": circular },
          { invisible: !active },
        )}
      >
        {label}
      </span>
      {children}
    </div>
  );
};

interface FilterOptionProps extends React.HTMLProps<HTMLLIElement> {
  value: string;
  active: boolean;
}

const FilterOption: React.FC<FilterOptionProps> = ({
  value,
  active,
  children,
  className,
  ...props
}) => {
  return (
    <li
      data-value={value}
      data-active={active}
      className={cn(active ? "bg-neutral text-neutral-content" : "", className)}
      {...props}
    >
      {children}
    </li>
  );
};

export const Filters: React.FC = () => {
  const [isStale, setIsStale] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());

  const app = use(AppContext)!;

  const { filters, setFilters } = use(SearchContext)!;

  //initially load ith user prefs
  const [categories, setCategories] = useState<Record<string, boolean>>(
    filters.categories,
  );
  const [authors, setAuthors] = useState<Record<string, boolean>>(
    filters.authors,
  );
  const [sources, setSources] = useState<Record<string, boolean>>(
    filters.sources,
  );
  const [publications, setPublications] = useState<Record<string, boolean>>(
    filters.publications,
  );

  function clear() {
    setStartDate(undefined);
    setEndDate(new Date());
    setCategories({});
    setAuthors({});
    setSources({});
    setPublications({});
  }

  function refresh() {
    setFilters((prevState) => ({
      ...prevState,
    }));
  }

  function apply() {
    setIsStale(false);
    setFilters((prevState) => ({
      ...prevState,
      startDate,
      endDate,
      categories,
      authors,
      sources,
      publications,
    }));
  }

  function handleAuthor(event: React.MouseEvent<HTMLLIElement>): void {
    const { active, value } = getFilterArgs(event);
    setAuthors((prevState) => updateArgs(prevState, value, active));
  }

  function handleCategory(event: React.MouseEvent<HTMLLIElement>): void {
    const { active, value } = getFilterArgs(event);
    setCategories((prevState) => updateArgs(prevState, value, active));
  }

  function handleSource(event: React.MouseEvent<HTMLLIElement>): void {
    const { active, value } = getFilterArgs(event);
    setSources((prevState) => updateArgs(prevState, value, active));
  }

  function handlePublication(event: React.MouseEvent<HTMLLIElement>): void {
    const { active, value } = getFilterArgs(event);
    setPublications((prevState) => updateArgs(prevState, value, active));
  }

  useEffect(() => {
    setIsStale(true);
  }, [startDate, endDate, categories, authors, sources]);

  const authorFilters = activeFilters(authors);
  const categoryFilters = activeFilters(categories);
  const publicationFilters = activeFilters(publications);

  return (
    <div className="join join-vertical sm:join-horizontal lg:align-auto w-full sm:justify-center xl:col-span-2 xl:w-auto xl:justify-end">
      <FilterIndicator
        active={Boolean(startDate)}
        circular={Boolean(startDate)}
      >
        <button
          popoverTarget="rdp-popover-from"
          className="btn btn-ghost"
          style={{ anchorName: "--rdp-date-from" } as React.CSSProperties}
        >
          From
        </button>
      </FilterIndicator>
      <div
        popover="auto"
        id="rdp-popover-from"
        className="dropdown w-full shadow-sm md:w-auto"
        style={{ positionAnchor: "--rdp-date-from" } as React.CSSProperties}
      >
        <DayPicker
          className="react-day-picker"
          mode="single"
          selected={startDate}
          onSelect={setStartDate}
          disabled={{
            before: minDate,
            ...(endDate && { after: endDate }),
            ...(!endDate && { after: today }),
          }}
          footer={
            startDate
              ? `From: ${printLocalDate(startDate)}`
              : "Pick a start date."
          }
        />
      </div>

      <FilterIndicator active={Boolean(endDate)} circular={Boolean(endDate)}>
        <button
          popoverTarget="rdp-popover-to"
          className="btn btn-ghost"
          style={{ anchorName: "--rdp-date-to" } as React.CSSProperties}
        >
          To
        </button>
      </FilterIndicator>
      <div
        popover="auto"
        id="rdp-popover-to"
        className="dropdown w-full shadow-sm md:w-auto"
        style={{ positionAnchor: "--rdp-date-to" } as React.CSSProperties}
      >
        <DayPicker
          className="react-day-picker"
          mode="single"
          disabled={{
            after: today,
            ...(startDate && { before: startDate }),
          }}
          selected={endDate}
          onSelect={setEndDate}
          footer={
            endDate ? `To: ${printLocalDate(endDate)}` : "Pick an end date."
          }
        />
      </div>

      <div className="dropdown dropdown-start">
        <FilterIndicator active={authorFilters > 0} label={`${authorFilters}`}>
          <button className="btn btn-ghost btn-block md:w-auto">Author</button>
        </FilterIndicator>
        <div className="dropdown-content menu bg-base-100 rounded-box overflow-x-none z-1 max-h-160 w-full overflow-x-clip overflow-y-auto p-2 shadow-sm md:w-56">
          <ul tabIndex={0}>
            {app.authors.map(({ label, value }, i) => (
              <FilterOption
                onClick={handleAuthor}
                value={value}
                active={authors[value]}
                key={`author-${i}-${value}`}
              >
                <a>{label}</a>
              </FilterOption>
            ))}
          </ul>
        </div>
      </div>

      <div className="dropdown dropdown-start">
        <FilterIndicator
          active={categoryFilters > 0}
          label={`${categoryFilters}`}
        >
          <button className="btn btn-ghost btn-block md:w-auto">
            Category
          </button>
        </FilterIndicator>
        <div className="dropdown-content menu bg-base-100 rounded-box overflow-x-none z-1 max-h-160 w-full overflow-x-clip overflow-y-auto p-2 shadow-sm md:w-56">
          <ul tabIndex={0}>
            {app.categories.map(({ label, value }, i) => (
              <FilterOption
                onClick={handleCategory}
                value={value}
                active={categories[value]}
                key={`category-${i}-${value}`}
              >
                <a>{label}</a>
              </FilterOption>
            ))}
          </ul>
        </div>
      </div>

      <div className="dropdown dropdown-start">
        <FilterIndicator
          active={publicationFilters > 0}
          label={`${publicationFilters}`}
        >
          <button className="btn btn-ghost btn-block md:w-auto">Sources</button>
        </FilterIndicator>
        <div className="dropdown-content menu bg-base-100 rounded-box overflow-x-none z-1 max-h-160 w-full overflow-x-clip overflow-y-auto p-2 shadow-sm md:w-56">
          <ul tabIndex={0}>
            {app.publications.map(({ label, value }, i) => (
              <FilterOption
                onClick={handlePublication}
                value={value}
                active={publications[value]}
                key={`publication-${i}-${value}`}
              >
                <a>{label}</a>
              </FilterOption>
            ))}
          </ul>
        </div>
      </div>

      <div className="dropdown dropdown-start">
        <button
          className="btn btn-ghost join-item btn-block md:w-auto"
          title="Configure datasources"
        >
          <span className="sr-only">Configure datasources</span>
          <Cog8ToothIcon className="size-4" />
        </button>
        <div className="dropdown-content menu bg-base-100 rounded-box overflow-x-none z-1 max-h-160 w-full overflow-x-clip overflow-y-auto p-2 shadow-sm md:w-56">
          <ul tabIndex={0}>
            {app.sources.map(({ label, value }, i) => (
              <FilterOption
                onClick={handleSource}
                value={value}
                active={sources[value]}
                key={`source-${i}-${value}`}
              >
                <a>{label}</a>
              </FilterOption>
            ))}
          </ul>
        </div>
      </div>

      <button
        className="btn join-item btn-warning"
        onClick={clear}
        title="Clear filters"
      >
        <span className="sr-only">Clear filters</span>
        <XMarkIcon className="invisbile size-4 md:visible" />
      </button>
      <button
        className="btn join-item btn-secondary"
        onClick={refresh}
        title="Refresh filters"
      >
        <span className="sr-only">Refresh</span>
        <ArrowPathIcon className="invisbile size-4 md:visible" />
      </button>
      <button
        className={cn("btn join-item btn-primary", {
          "animate-pulse": isStale,
        })}
        onClick={apply}
        title="Search"
      >
        <span className="sr-only">Search</span>
        <MagnifyingGlassIcon className="invisbile size-4 md:visible" />
      </button>
    </div>
  );
};

export default Filters;

const getFilterArgs = (
  event: React.MouseEvent<HTMLLIElement>,
): { value: string; active: boolean } => {
  const active = event.currentTarget.dataset["active"] === "true";
  const value = event.currentTarget.dataset["value"]!;
  return { active, value };
};

const updateArgs = (
  src: Record<string, boolean>,
  value: string,
  active: boolean,
): Record<string, boolean> => {
  const staging = { ...src };
  staging[value] = !active;
  return staging;
};

const activeFilters = (value: Record<string, boolean>): number => {
  return Object.values(value).filter((active) => active).length;
};
