import { createSlice } from "@reduxjs/toolkit"

export const colorToolSlice = createSlice({
    name: 'colorToolSlice',
    initialState: { colors: [] },
    reducers: {
        setColors: (stateSlice, { payload }) => {
            stateSlice.colors = payload
        }
    }
})

export const { setColors } = colorToolSlice.actions

export const selectColors = state => state.colorToolSlice.colors

export const { reducer: colorToolReducer } = colorToolSlice
