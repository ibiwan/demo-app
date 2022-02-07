import { createSlice, nanoid } from "@reduxjs/toolkit";
import { initialCars } from "./carToolConfig";

export const MODE_ADD = 'add'
export const MODE_EDIT = 'edit'
export const CAR_TOOL_SLICE = 'carToolSlice'

const defaultMode = {
    mode: 'default',
    editCarId: null,
}

const initialState = {
    ...defaultMode,
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
        addCar: (stateSlice, { payload: { car } }) => {
            stateSlice.cars.push({
                ...car,
                id: nanoid()
            })
        },
        editCar: (stateSlice, { payload, payload: { id, data } }) => {
            const i = stateSlice.cars.findIndex(car => car.id === id)
            console.log({ payload })
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
    setMode, resetMode, addCar, editCar, deleteCar
} = carToolSlice.actions

export const selectCars = state => state[CAR_TOOL_SLICE].cars
export const selectInAddMode = state => state[CAR_TOOL_SLICE].mode.mode === MODE_ADD
export const selectEditCarId = state => state[CAR_TOOL_SLICE].mode.editCarId

export const { reducer: carToolReducer } = carToolSlice
