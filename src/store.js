import { configureStore } from '@reduxjs/toolkit'
import { calcReducer } from "./features/calcTool/calcSlice";

export const store = configureStore({
    reducer: {
        calcToolSlice: calcReducer
    },
})
