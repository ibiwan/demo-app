import { configureStore } from '@reduxjs/toolkit'

import { calcReducer } from "./features/calcTool/calcSlice";
import { colorToolReducer } from './features/colorTool/colorToolSlice';
import { colorApiMiddleware, colorApiReducer, colorApiReducerPath } from './shared/services/apiSlice';

export const store = configureStore({
    reducer: {
        [colorApiReducerPath]: colorApiReducer,

        calcToolSlice: calcReducer,
        // carToolSlice: carReducer,
        colorToolSlice: colorToolReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(colorApiMiddleware),
})
