import { useState } from "react"
import { newIdFor } from "../util"
import { useObjList } from "./useObjList"

export const useCarToolStore = (initialCars) => {
    const defaultMode = { mode: 'default', editCarId: null }
    const [mode, setMode] = useState({ ...defaultMode })
    const inAddMode = mode.mode === 'add'
    const inEditMode = mode.mode === 'edit'
    const editModeId = mode.editCarId

    const setAddMode = () => setMode({
        ...mode, mode: 'add', editCarId: null
    })
    const setEditMode = id => setMode({
        ...mode, mode: 'edit', editCarId: id
    })
    const resetMode = () => setMode({ ...defaultMode })

    const [
        carsList,
        addCarToList,
        updateCarInList,
        deleteCarFromList
    ] = useObjList([...initialCars])

    const addCar = car => {
        addCarToList({ ...car, id: newIdFor(carsList) })
        resetMode()
    }

    const deleteCar = car => {
        deleteCarFromList(car, (a, b) => a.id === b.id)
        resetMode()
    }

    const editCar = (car) => {
        updateCarInList(car, car, (a, b) => a.id === b.id)
        resetMode()
    }

    return {
        inAddMode, inEditMode, editModeId,
        setAddMode, setEditMode, resetMode,
        carsList, addCar, deleteCar, editCar
    }
}