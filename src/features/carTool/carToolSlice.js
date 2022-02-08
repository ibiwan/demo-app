import { createSelector, createSlice } from "@reduxjs/toolkit";
import { makeid, spaceship } from "../../util";
import { initialCars } from "./carToolConfig";

export const MODE_ADD = 'add'
export const MODE_EDIT = 'edit'
export const CAR_TOOL_SLICE = 'carToolSlice'

const defaultMode = {
    mode: 'default',
    editCarId: null,
}

const defaultSort = {
    field: null,
    dir: 1,
}

const initialState = {
    ...defaultMode,
    sortMode: defaultSort,
    cars: initialCars,
}

const carToolSlice = createSlice({
    name: CAR_TOOL_SLICE,
    initialState,
    reducers: {
        setMode: (stateSlice, { payload: { mode, id = null } }) => {
            stateSlice.mode = { mode, editCarId: id }
        },
        resetMode: stateSlice => { stateSlice.mode = defaultMode },
        setSortMode: (stateSlice, { payload: { field, dir } }) => {
            stateSlice.sortMode = { field, dir }
        },
        addCar: (stateSlice, { payload }) => {
            const id = makeid()
            console.log({ id })
            stateSlice.cars.push({
                ...payload,
                id: Number(makeid())
            })
        },
        editCar: (stateSlice, { payload, payload: { id, data } }) => {
            const i = stateSlice.cars.findIndex(car => car.id === id)
            if (i > -1) {
                stateSlice.cars[i] = {
                    ...data,
                    id,
                }
            }
        },
        deleteCar: (stateSlice, { payload: { id } }) => {
            const i = stateSlice.cars.findIndex(car => car.id === id)
            if (i > -1) {
                stateSlice.cars.splice(i, 1)
            }
        },
    },
})

export const {
    setMode, setSortMode, resetMode,
    addCar, editCar, deleteCar,
} = carToolSlice.actions

const selectCars = state => state[CAR_TOOL_SLICE].cars
export const selectInAddMode = state => state[CAR_TOOL_SLICE].mode.mode === MODE_ADD
export const selectEditCarId = state => state[CAR_TOOL_SLICE].mode.editCarId
export const selectSortMode = state => state[CAR_TOOL_SLICE].sortMode

export const selectSortedCars = createSelector(
    selectCars, selectSortMode,
    (cars, { field, dir }) => {
        if (!field) {
            return cars
        }

        return [...cars].sort((c, d) =>
            dir * spaceship(c[field], d[field])
        )
    })

export const { reducer: carToolReducer } = carToolSlice
