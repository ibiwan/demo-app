import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { carToolReducer, CAR_TOOL_SLICE } from "./carToolSlice";

const store = configureStore({
    reducer: {
        [CAR_TOOL_SLICE]: carToolReducer
    },
    middleware: getCurrent => [
        ...getCurrent(),
        thunk,
    ]
})

export const CarToolStoreProvider = ({ children }) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}
