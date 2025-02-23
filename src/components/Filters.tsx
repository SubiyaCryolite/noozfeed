import AppContext from "@/contexts/AppContext";
import FunnelIcon from "@heroicons/react/24/outline/FunnelIcon";
import { use } from "react";

export const Filters: React.FC = () => {
  const { categories, authors } = use(AppContext)!;

  const dummyAuthorFunc = () => {
    //TODO use this to toggle the current contexts author filter
  };

  const dummyCategoryFunc = () => {
    //TODO use this to toggle the current contexts category filter
  };

  return (
    <div>
      <div className="join join-vertical sm:join-horizontal">
        <FunnelIcon
          className="join-item h-[1em] opacity-50"
          aria-label="Filters"
        />

        <div className="dropdown dropdown-start">
          <button className="btn btn-outline join-item">Author</button>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            {authors.map(({ label, value }, i) => (
              <li key={`author-${i}-${value}`}>
                <a onClick={dummyAuthorFunc}>{label}</a>
              </li>
            ))}
          </ul>
        </div>

        <button className="btn btn-outline join-item">Date</button>

        <div className="dropdown dropdown-start">
          <button className="btn btn-outline join-item">Category</button>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            {categories.map(({ label, value }, i) => (
              <li key={`category-${i}-${value}`}>
                <a onClick={dummyCategoryFunc}>{label}</a>
              </li>
            ))}
          </ul>
        </div>

        <button className="btn join-item btn-secondary">Clear</button>
        <button className="btn join-item btn-primary">Apply</button>
      </div>
    </div>
  );
};

export default Filters;
