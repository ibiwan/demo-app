import { createSelector, createSlice } from "@reduxjs/toolkit";
import { spaceship } from "../../util";

import { createApi } from "../../shared/services/apiData";

export const MODE_ADD = 'add'
export const MODE_EDIT = 'edit'
export const CAR_TOOL_SLICE = 'carToolSlice'

const {
    all: _allCars,
    append: _appendCar,
    replace: _replaceCar,
    remove: _removeCar,
} = createApi('cars')

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
    cars: [],
    loading: false,
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
        refreshCarsRequest: (stateSlice) => {
            stateSlice.loading = true
        },
        refreshCarsDone: (stateSlice, { payload }) => {
            stateSlice.cars = payload
            stateSlice.mode = defaultMode
            stateSlice.loading = false
        },
        addCarRequest: (stateSlice) => {
            stateSlice.loading = true
        },
        updateCarRequest: (stateSlice) => {
            stateSlice.loading = true
        },
        deleteCarRequest: (stateSlice) => {
            stateSlice.loading = true
        },
    },
})

const { addCarRequest, refreshCarsRequest, refreshCarsDone,
    updateCarRequest, deleteCarRequest
} = carToolSlice.actions
export const {
    setMode, setSortMode, resetMode,
} = carToolSlice.actions

const selectCars = state => state[CAR_TOOL_SLICE].cars
export const selectInAddMode = state => state[CAR_TOOL_SLICE].mode.mode === MODE_ADD
export const selectEditCarId = state => state[CAR_TOOL_SLICE].mode.editCarId
export const selectSortMode = state => state[CAR_TOOL_SLICE].sortMode
export const selectLoading = state => state[CAR_TOOL_SLICE].loading

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

export const refreshCars = () => async (dispatch) => {
    dispatch(refreshCarsRequest())
    const cars = await _allCars()
    await new Promise(resolve=>setTimeout(resolve, 500))
    dispatch(refreshCarsDone(cars))
}

export const appendCar = (car) => async (dispatch) => {
    dispatch(addCarRequest(car))
    const newCar = await _appendCar(car)
    console.log(newCar)
    dispatch(refreshCars())
}

export const saveCar = (car) => async (dispatch) => {
    console.log('saveCar', car)
    dispatch(updateCarRequest(car))
    const newCar = await _replaceCar(car)
    console.log(newCar)
    dispatch(refreshCars())
}

export const removeCar = (car) => async (dispatch) => {
    console.log(car)
    dispatch(deleteCarRequest(car))
    const newCar = await _removeCar(car.id)
    console.log(newCar)
    dispatch(refreshCars())
}

export const { reducer: carToolReducer } = carToolSlice
