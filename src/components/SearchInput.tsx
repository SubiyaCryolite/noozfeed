import React from "react";
import MagnifyingGlassIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";

export const SearchInput: React.FC = () => {
  return (
    <label className="input">
      <MagnifyingGlassIcon className="h-[1em] opacity-50" />
      <input type="search" placeholder="Search" />
    </label>
  );
};

export default SearchInput;
