import { createContext, useContext } from "react";

import { useCarToolStore } from "../hooks/useCarToolStore"

const carList = [
    {
        id: 68,
        make: 'Honda',
        model: 'Civic LX',
        year: 2010,
        color: 'Gray',
        price: 23000
    },
    {
        id: 89,
        make: 'Kia',
        model: 'Soul +',
        year: 2011,
        color: 'Blue',
        price: 17000
    },
]

const carToolStoreContext = createContext()

export const CarToolStoreProvider = ({ children }) => {
    return (
        <carToolStoreContext.Provider
            value={useCarToolStore(carList)}
        >
            {children}
        </carToolStoreContext.Provider>
    )
}

export const useCarToolStoreContext = () => {
    return useContext(carToolStoreContext)
}
