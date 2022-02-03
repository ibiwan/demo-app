import PropTypes from 'prop-types'
import { useState } from "react"
import { carRowPropType, carTableColumnsDefType } from "../propTypes/car"

export const CarEditRow = ({
    car,
    tableColumns,
    onSubmitEditCar,
    saveEditButtonText,
    cancelButtonText,
    onCancel,
}) => {
    const { actions, ...slimCar } = car
    const [changesMade, setChangesMade] = useState(false)
    const [carForm, setCarForm] = useState(slimCar)

    const change = ({ target: { name, value } }) => {
        setChangesMade(true)
        setCarForm({
            ...carForm,
            [name]: value,
        })
    }

    const submit = () => {
        onSubmitEditCar({ ...carForm })
    }

    return (
        <tr>
            {tableColumns.map(({ key, editable }) => {
                let content
                if (editable === false) {
                    content = carForm[key]
                } else if (key === 'actions') {
                    content = <>
                        <button
                            type="button"
                            disabled={!changesMade}
                            onClick={submit}
                        >
                            {saveEditButtonText}
                        </button>
                        <button
                            type="button"
                            onClick={onCancel}
                        >
                            {cancelButtonText}
                        </button>
                    </>
                } else {
                    content = <input
                        type="text"
                        name={key}
                        value={carForm[key]}
                        onChange={change}
                        size={10}
                    />
                }
                return (<td key={key}>{content}</td>)
            })}
        </tr>
    )
}

CarEditRow.propTypes = {
    car: carRowPropType.isRequired,
    tableColumns: carTableColumnsDefType.isRequired,
    onSubmitEditCar: PropTypes.func.isRequired,
    saveEditButtonText: PropTypes.string.isRequired,
    cancelButtonText: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired
}
