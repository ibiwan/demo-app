import { useCallback, useEffect, useMemo } from "react"

import {
    setMode, resetMode, setSortMode,
    selectSortedCars, selectEditCarId,
    selectInAddMode, selectSortMode,
    refreshCars, appendCar, saveCar, removeCar,
    MODE_ADD, MODE_EDIT, selectLoading,
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
        refreshCars,
        addCar: appendCar,
        deleteCar: removeCar
    }, dispatch), [dispatch])

    const cars = useSelector(selectSortedCars)
    const inAddMode = useSelector(selectInAddMode)
    const editCarId = useSelector(selectEditCarId)
    const sortMode = useSelector(selectSortMode)
    const loading = useSelector(selectLoading)

    const submitEditCar = useCallback((data) => {
        dispatch(saveCar({ id: editCarId, ...data }))
        dispatch(resetMode())
    }, [dispatch, editCarId])

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

    useEffect(() => {
        dispatch(refreshCars())
    }, [dispatch])

    return {
        ...boundActions,
        cars,
        inAddMode,
        editCarId,
        sortMode,
        loading,
        editCar: submitEditCar,
        setSortMode: submitSortMode,
    }
}