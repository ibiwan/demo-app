import { createContext, useContext } from "react";
import { useObjList } from '../hooks/useObjList'

const colorList = [
    { id: 1, name: 'red', hexcode: 'FF0000' },
    { id: 2, name: 'green', hexcode: '33BB33' },
    { id: 3, name: 'blue', hexcode: '0000FF' },
]

const colorToolStoreContext = createContext()

export const ColorToolStoreProvider = ({ children }) => {
    return (
        <colorToolStoreContext.Provider
            value={useObjList(colorList)}
        >
            {children}
        </colorToolStoreContext.Provider>
    )
}

export const useColorToolStoreContext = () => {
    return useContext(colorToolStoreContext)
}
