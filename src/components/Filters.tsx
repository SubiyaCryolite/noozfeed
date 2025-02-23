import AppContext from "@/contexts/AppContext";
import SearchContext from "@/contexts/SearchContext";
import FunnelIcon from "@heroicons/react/24/outline/FunnelIcon";
import { use } from "react";

export const Filters: React.FC = () => {
  const { categories, authors, sources } = use(AppContext)!;
  const {
    searchArguments: {
      categories: categoryArgs,
      authors: authorArgs,
      sources: sourceArgs,
    },
    setSearchArguments,
  } = use(SearchContext)!;

  console.log({ categoryArgs, authorArgs, sourceArgs });

  function handleAuthor(event: React.MouseEvent<HTMLLIElement>): void {
    const { active, value } = getFilterArgs(event);
    setSearchArguments((prevState) => {
      return {
        ...prevState,
        authors: updateArgs(prevState.authors, value, active),
      };
    });
  }

  function handleCategory(event: React.MouseEvent<HTMLLIElement>): void {
    const { active, value } = getFilterArgs(event);
    setSearchArguments((prevState) => {
      return {
        ...prevState,
        categories: updateArgs(prevState.categories, value, active),
      };
    });
  }

  function handleSource(event: React.MouseEvent<HTMLLIElement>): void {
    const { active, value } = getFilterArgs(event);
    setSearchArguments((prevState) => {
      return {
        ...prevState,
        sources: updateArgs(prevState.sources, value, active),
      };
    });
  }

  return (
    <div className="join join-vertical sm:join-horizontal">
      <FunnelIcon
        className="join-item h-[1em] opacity-50"
        aria-label="Filters"
      />

      <div className="dropdown dropdown-start">
        <button className="btn btn-outline join-item">Author</button>
        <div className="dropdown-content menu bg-base-100 rounded-box overflow-x-none z-1 max-h-160 w-72 overflow-x-clip overflow-y-auto p-2 shadow-sm">
          <ul tabIndex={0} className="w-full">
            {authors.map(({ label, value }, i) => (
              <li
                onClick={handleAuthor}
                data-value={value}
                data-active={authorArgs[value]}
                key={`author-${i}-${value}`}
                className={authorArgs[value] ? "bg-violet-600" : ""}
              >
                <a>{label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button className="btn btn-outline join-item">Date</button>

      <div className="dropdown dropdown-start">
        <button className="btn btn-outline join-item">Category</button>
        <div className="dropdown-content menu bg-base-100 rounded-box overflow-x-none z-1 max-h-160 w-56 overflow-x-clip overflow-y-auto p-2 shadow-sm">
          <ul tabIndex={0}>
            {categories.map(({ label, value }, i) => (
              <li
                onClick={handleCategory}
                data-value={value}
                data-active={categoryArgs[value]}
                key={`category-${i}-${value}`}
                className={categoryArgs[value] ? "bg-violet-600" : ""}
              >
                <a>{label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="dropdown dropdown-start">
        <button className="btn btn-outline join-item">Sources</button>
        <div className="dropdown-content menu bg-base-100 rounded-box overflow-x-none z-1 max-h-160 w-56 overflow-x-clip overflow-y-auto p-2 shadow-sm">
          <ul tabIndex={0}>
            {sources.map(({ label, value }, i) => (
              <li
                onClick={handleSource}
                data-value={value}
                data-active={sourceArgs[value]}
                key={`source-${i}-${value}`}
                className={sourceArgs[value] ? "bg-violet-600" : ""}
              >
                <a>{label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button className="btn join-item btn-secondary">Clear</button>
      <button className="btn join-item btn-primary">Apply</button>
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
