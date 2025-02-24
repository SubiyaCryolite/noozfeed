import { use, useState } from "react";
import { DayPicker } from "react-day-picker";

import AppContext from "@/contexts/AppContext";
import SearchContext from "@/contexts/SearchContext";
import ChevronUpIcon from "@heroicons/react/24/outline/ChevronUpIcon";
import ChevronDownIcon from "@heroicons/react/24/outline/ChevronDownIcon";
import MagnifyingGlassIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import EyeSlashIcon from "@heroicons/react/24/outline/EyeSlashIcon";
import Cog8ToothIcon from "@heroicons/react/24/outline/Cog8ToothIcon";
import { cn, printLocalDate } from "@/utils";

const minDate = new Date(1900, 1, 1);
const today = new Date();

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
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

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
    setEndDate(undefined);
    setCategories({});
    setAuthors({});
    setSources({});
    setPublications({});
  }

  function apply() {
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

  return (
    <div className="join join-vertical sm:join-horizontal lg:align-auto w-full sm:justify-center xl:col-span-2 xl:w-auto xl:justify-end">
      <button
        popoverTarget="rdp-popover-from"
        className="btn btn-outline join-item"
        style={{ anchorName: "--rdp-date-from" } as React.CSSProperties}
      >
        From
      </button>
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

      <button
        popoverTarget="rdp-popover-to"
        className="btn btn-outline join-item"
        style={{ anchorName: "--rdp-date-to" } as React.CSSProperties}
      >
        To
      </button>
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
        <button className="btn btn-outline join-item btn-block md:w-auto">
          Author
          {/* <div
            className={cn("badge badge-sm badge-secondary", {
              invisible: !numAuthors.current,
            })}
          >
            {numAuthors.current}
          </div> */}
        </button>
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
        <button className="btn btn-outline join-item btn-block md:w-auto">
          Category
        </button>
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
        <button className="btn btn-outline join-item btn-block md:w-auto">
          Sources
        </button>
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
          className="btn btn-outline join-item btn-block md:w-auto"
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
        className="btn join-item btn-secondary"
        onClick={clear}
        title="Clear filters"
      >
        <span className="sr-only">Clear filters</span>
        <XMarkIcon className="invisbile size-4 md:visible" />
      </button>
      <button
        className="btn join-item btn-primary"
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
