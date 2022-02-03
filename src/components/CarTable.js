import { useMemo, useState } from "react"
import PropTypes from 'prop-types'

import { spaceship } from "../util"
import { CarViewRow } from "./CarViewRow"
import { carsPropType } from "../propTypes/car"
import { CarEditRow } from "./CarEditRow"

const nf = new Intl.NumberFormat('en-US')

const tableColumns = [
    { key: 'id', label: 'Id', editable: false },
    { key: 'year', label: 'Year', },
    { key: 'make', label: 'Make' },
    { key: 'model', label: 'Model[trim]' },
    { key: 'color', label: 'Color' },
    {
        key: 'price', label: 'Price New',
        fmt: v => `$${nf.format(v)}`
    },
    {
        key: 'actions', label: 'Actions',
        sortable: false,
    },
]

export const CarTable = ({
    cars,
    deleteButtonText,
    onDeleteCar,
    editButtonText,
    editCarId,
    onSelectEditCar,
    onSubmitEditCar,
    saveEditButtonText,
    cancelButtonText,
    onCancel,
}) => {
    const [sortMode, setSortMode] = useState({ field: null, dir: 1 })

    const reSort = (key) => {
        if (tableColumns.find(c => c.key === key).sortable === false) {
            return
        }

        if (key !== sortMode.field) {
            setSortMode({
                field: key,
                dir: 1,
            })
        } else {
            setSortMode({
                ...sortMode,
                dir: -sortMode.dir
            })
        }
    }

    // avoid recomputing sort when unnecessary
    const carList = useMemo(() => {
        const sortedList = [...cars]
        if (sortMode.field) {
            // in-place
            sortedList.sort((car1, car2) => {
                return sortMode.dir * spaceship(
                    car1[sortMode.field],
                    car2[sortMode.field],
                )
            })
        }

        const actions = (c) => {
            return (<>
                <button
                    onClick={() => onDeleteCar(c)}
                >
                    {deleteButtonText}
                </button>
                <button
                    onClick={() => onSelectEditCar(c.id)}
                >
                    {editButtonText}
                </button>
            </>)
        }

        // add button to actions column while we're here
        return sortedList.map(c => ({
            ...c,
            actions: actions(c),
        }))
    }, [cars, sortMode, deleteButtonText, onDeleteCar, editButtonText, onSelectEditCar])

    return (
        <table className="display-table">
            <thead>
                <tr>
                    {tableColumns.map(({ label, key }) => {
                        let sortSuffix = ''
                        if (key === sortMode.field) {
                            sortSuffix = sortMode.dir > 0 ? ' (asc)' : ' (desc)'
                        }
                        return (
                            <th
                                key={`${key}`}
                                onClick={() => reSort(key)}
                            >{label + sortSuffix}</th>
                        )
                    }
                    )}
                </tr>
            </thead>
            <tbody>
                {carList.map((car) => {
                    return car.id === editCarId ?
                        <CarEditRow
                            key={`edit:${car.id}`}
                            car={car}
                            tableColumns={tableColumns}
                            saveEditButtonText={saveEditButtonText}
                            onSubmitEditCar={onSubmitEditCar}
                            cancelButtonText={cancelButtonText}
                        onCancel={onCancel}
                        /> :
                        < CarViewRow
                            key={car.id}
                            car={car}
                            tableColumns={tableColumns}
                        />
                }
                )}
            </tbody>
        </table>
    )
}

CarTable.propTypes = {
    cars: carsPropType.isRequired,
    deleteButtonText: PropTypes.string.isRequired,
    editButtonText: PropTypes.string.isRequired,
    onDeleteCar: PropTypes.func.isRequired,
    editCarId: PropTypes.number,
    onSelectEditCar: PropTypes.func.isRequired,
    onSubmitEditCar: PropTypes.func.isRequired,
    saveEditButtonText: PropTypes.string.isRequired,
    cancelButtonText: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
}
