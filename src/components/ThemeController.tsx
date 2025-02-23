import React from "react";

import SunIcon from "@heroicons/react/24/outline/SunIcon";
import MoonIcon from "@heroicons/react/24/outline/MoonIcon";

export const ThemeControler: React.FC = () => {
  //set theme in add context

  return (
    <label className="swap swap-rotate">
      <input type="checkbox" className="theme-controller" value="dark" />
      <SunIcon aria-label="sun" className="swap-off h-10 w-10 fill-current" />
      <MoonIcon aria-label="moon" className="swap-on h-10 w-10 fill-current" />
    </label>
  );
};

export default ThemeControler;
