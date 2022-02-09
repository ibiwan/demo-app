import PropTypes from 'prop-types'
import { useCallback } from 'react'

import { useForm } from '../../../hooks/useForm'
import { carRowPropType, carTableColumnsDefType } from '../../../shared/propTypes/car'
import { CarEditActions } from './CarEditActions'

export const CarEditRow = ({
    car,
    tableColumns,
    onSubmitEditCar,
    onCancel,
}) => {
    const { id, ...slimCar } = car

    const {
        form: carForm,
        change: setCarForm,
        changesMade,
    } = useForm({ ...slimCar })

    const createActions = useCallback(() => (
        <CarEditActions
            {...{
                carForm,
                changesMade,
                onSubmitEditCar,
                onCancel,
            }}
        />
    ), [
        carForm,
        changesMade,
        onSubmitEditCar,
        onCancel,
    ])

    const carRow = {
        ...car,
        actions: createActions(car),
    }

    return (
        <tr>
            {tableColumns.map(({ key, editable = true }) => {
                const content = editable ?
                    <input
                        type="text"
                        name={key}
                        value={carForm[key]}
                        onChange={setCarForm}
                        size={10}
                    /> :
                    carRow[key]
                return (<td key={key}>{content}</td>)
            })}
        </tr>
    )
}

CarEditRow.propTypes = {
    car: carRowPropType.isRequired,
    tableColumns: carTableColumnsDefType.isRequired,
    onSubmitEditCar: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
}
