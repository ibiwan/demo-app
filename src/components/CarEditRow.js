import PropTypes from 'prop-types'
import { useForm } from '../hooks/useForm'
import { carRowPropType, carTableColumnsDefType } from "../propTypes/car"

export const CarEditRow = ({
    car,
    tableColumns,
    onSubmitEditCar,
    saveEditButtonText,
    cancelButtonText,
    onCancel,
}) => {
    console.log("render CarEditRow")
    
    const { actions, ...slimCar } = car

    const {
        form: carForm,
        change: setCarForm,
        changesMade
    } = useForm({ ...slimCar })

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
                        onChange={setCarForm}
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
