import { useMemo } from "react"

import {
    setMode, resetMode,
    addCar, editCar, deleteCar,
    selectCars, selectEditCarId,
    selectInAddMode, 
    MODE_ADD, MODE_EDIT
} from './carToolSlice'
import { bindActionCreators } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux"

export const useCarToolSlice = () => {

    const setAddMode = () => setMode({ mode: MODE_ADD })
    const setEditMode = id => setMode({ mode: MODE_EDIT, id })

    const dispatch = useDispatch()
    const boundActions = useMemo(() => bindActionCreators({
        setAddMode, setEditMode, resetMode,
        addCar, editCar, deleteCar,
    }, dispatch), [dispatch])

    const cars = useSelector(selectCars)
    const inAddMode = useSelector(selectInAddMode)
    const editCarId = useSelector(selectEditCarId)

    return {
        ...boundActions,
        cars,
        inAddMode,
        editCarId
    }
}