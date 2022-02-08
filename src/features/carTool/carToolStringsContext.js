import { createContext } from "react";
import { strings } from "./carToolConfig";

export const CarToolStringsContext = createContext()

export const CarToolStringsProvider = ({ children }) => {
    return (
        <CarToolStringsContext.Provider value={strings}>
            {children}
        </CarToolStringsContext.Provider>
    )
}

