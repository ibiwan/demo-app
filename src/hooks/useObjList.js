import { useState } from "react"

export const useObjList = listData => {
    const [list, setList] = useState([...listData])

    const addItem = item => setList([...list, { ...item }])

    const deleteItem = (
        tgt,
        cmp = ((val, target) => val === target)
    ) => {
        setList(list.filter(val => !cmp(val, tgt)))
    }

    const updateItem = (
        oldItem, newItem,
        cmp = ((a, b) => a === b)
    ) => {
        setList(list.map(item =>
            cmp(oldItem, item) ?
                { ...oldItem, ...newItem } :
                item
        ))
    }

    return [list, addItem,updateItem, deleteItem]
}