import PropTypes from 'prop-types'

import { CarViewRow } from "./CarViewRow"
import { carsPropType } from "../../../propTypes/car"
import { CarEditRow } from "./CarEditRow"
import { tableColumns } from "../carToolConfig"
import { CarViewActions } from './CarViewActions'
import { useCallback } from 'react'
import { CarTableHeader } from './CarTableHeader'

export const CarTable = ({
    cars,
    sortMode,
    setSortMode,
    onDeleteCar,
    editCarId,
    onSelectEditCar,
    onSubmitEditCar,
    onCancel,
}) => {
    const onColumnClick = (key) => {
        if (tableColumns.find(c => c.key === key).sortable === false) {
            console.log(`not sortable: ${key}`)
            return
        }
        setSortMode(key)
    }

    const createActions = useCallback((car) => {
        return (< CarViewActions
            {...{
                car,
                onDeleteCar,
                onSelectEditCar,
            }}
        />)
    }, [onDeleteCar, onSelectEditCar,])

    return (
        <table className="display-table">
            <CarTableHeader
                {...{
                    tableColumns,
                    sortMode,
                    onColumnClick
                }}
            />
            <tbody>
                {cars.map((car) => {
                    const isEditRow = car.id === editCarId
                    const carRow = { ...car }
                    if (!isEditRow) {
                        carRow.actions = createActions(car)
                    }

                    return isEditRow ?
                        <CarEditRow
                            key={`edit:${car.id}`}
                            car={carRow}
                            tableColumns={tableColumns}
                            onSubmitEditCar={onSubmitEditCar}
                            onCancel={onCancel}
                        /> :
                        <CarViewRow
                            key={`view:${car.id}`}
                            car={carRow}
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
    onDeleteCar: PropTypes.func.isRequired,
    editCarId: PropTypes.number,
    onSelectEditCar: PropTypes.func.isRequired,
    onSubmitEditCar: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
}
