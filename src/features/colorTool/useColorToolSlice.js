import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'

import { useAddColorMutation, useGetColorsQuery } from "../../shared/services/apiSlice"
import { setColors, selectColors } from './colorToolSlice'
import { formatHexcode } from '../../util'

export const useColorToolSlice = () => {
    const dispatch = useDispatch()

    const { data, isLoading } = useGetColorsQuery()
    console.log({ data, isLoading })
    useEffect(() => {
        console.log("effecting")
        if (data && !isLoading) {
            console.log("setting")
            dispatch(setColors(data))
        }
    }, [data, isLoading, dispatch])

    const colors = useSelector(selectColors)
    const [addColorFormatted] = useAddColorMutation()
    const addColor = colorRaw => addColorFormatted({
        ...colorRaw,
        hexcode: formatHexcode(colorRaw.hexcode)
    })

    return {
        colors,
        addColor
    }
}
