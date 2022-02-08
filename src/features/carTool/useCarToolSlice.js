import { useCallback, useMemo } from "react"

import {
    setMode, resetMode, setSortMode,
    addCar, editCar, deleteCar,
    selectSortedCars, selectEditCarId,
    selectInAddMode, selectSortMode,
    MODE_ADD, MODE_EDIT,
} from './carToolSlice'
import { bindActionCreators } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux"

export const useCarToolSlice = () => {

    const setAddMode = () => setMode({ mode: MODE_ADD })
    const setEditMode = id => setMode({ mode: MODE_EDIT, id })

    const dispatch = useDispatch()
    const boundActions = useMemo(() => bindActionCreators({
        setAddMode,
        setEditMode,
        resetMode,
    }, dispatch), [dispatch])

    const cars = useSelector(selectSortedCars)
    const inAddMode = useSelector(selectInAddMode)
    const editCarId = useSelector(selectEditCarId)
    const sortMode = useSelector(selectSortMode)

    const submitAddCar = useCallback((data) => {
        dispatch(addCar(data))
        dispatch(resetMode())
    }, [dispatch])

    const submitEditCar = useCallback((data) => {
        dispatch(editCar({ id: editCarId, data }))
        dispatch(resetMode())
    }, [dispatch, editCarId])

    const submitDeleteCar = useCallback(id => {
        dispatch(deleteCar(id))
        dispatch(resetMode())
    }, [dispatch])

    const submitSortMode = useCallback((field) => {
        if (field === sortMode.field) {
            dispatch(setSortMode({
                ...sortMode,
                dir: -sortMode.dir,
            }))
        } else {
            dispatch(setSortMode({
                ...sortMode,
                field,
                dir: 1,
            }))
        }
    }, [dispatch, sortMode])

    return {
        ...boundActions,
        cars,
        inAddMode,
        editCarId,
        sortMode,
        addCar: submitAddCar,
        editCar: submitEditCar,
        deleteCar: submitDeleteCar,
        setSortMode: submitSortMode,
    }
}