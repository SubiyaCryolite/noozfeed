import { createContext } from "react";
import { AppContextType } from "@/interfaces";

const AppContext = createContext<AppContextType | undefined>(undefined);

export default AppContext;
