import React, { use, useCallback, useEffect, useRef, useState } from "react";
import MagnifyingGlassIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import SearchContext from "@/contexts/SearchContext";

export const SearchInput: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const timerRef = useRef<number>(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchText(event.target.value);
    debounce(event.target.value);
  };

  const { setFilters } = use(SearchContext)!;

  const debounce = useCallback(
    (debouncedValue: string) => {
      clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        setFilters((prevState) => ({
          ...prevState,
          searcthText: debouncedValue,
        }));
      }, 1000);
    },
    [setFilters],
  );

  //edge case, but necessary
  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <label className="input w-full md:w-auto">
      <MagnifyingGlassIcon className="h-[1em] opacity-50" />
      <input
        type="search"
        placeholder="Search"
        value={searchText}
        onChange={handleChange}
        maxLength={64}
      />
    </label>
  );
};

export default SearchInput;
