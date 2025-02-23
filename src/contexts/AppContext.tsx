import { createContext } from "react";
import { AppContextType } from "@/interfaces";

// const getValue = (): AppContextType => {
//   throw new Error("Error. Must be called from within a valid context provider");
// };

const AppContext = createContext<AppContextType | undefined>(undefined);

export default AppContext;
