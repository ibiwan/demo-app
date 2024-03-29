import PropTypes from 'prop-types'
import { useContext } from 'react'
import { useForm } from '../../../hooks/useForm'
import { upperFirst } from '../../../util'
import { carFormValidationRules, emptyCarForm } from '../carToolConfig'
import { CarToolStringsContext } from '../carToolStringsContext'

export const CarForm = ({
    onSubmitCar,
    onCancel,
}) => {
    const { addButtonText, cancelButtonText } = useContext(CarToolStringsContext)

    const {
        form: carForm,
        change: setCarForm,
        errors,
        validate,
    } = useForm(
        { ...emptyCarForm },
        carFormValidationRules
    )

    const submit = () => {
        const liveErrors = validate()
        const hasErrors = Object.values(liveErrors).filter(a => a).length
        if (hasErrors > 0) {
            return
        }

        onSubmitCar({
            ...carForm,
            year: Number(carForm.year),
            price: Number(carForm.price),
        })
    }

    return (
        <form style={{ display: 'flex', flexDirection: 'column' }}>
            {Object.keys(emptyCarForm).map(k => {
                return (
                    <label key={k}>
                        {upperFirst(k)}
                        {errors[k] && (
                            <div className="errors">{errors[k]}</div>
                        )}
                        <input
                            type="text"
                            name={k}
                            value={carForm[k]}
                            onChange={setCarForm}
                        />
                    </label>)
            })}
            <div style={{ display: 'flex' }}>
                <button type="button" onClick={submit}>
                    {addButtonText}
                </button>
                <button type="button" onClick={onCancel}>
                    {cancelButtonText}
                </button>
            </div>
        </form >
    )
}

CarForm.propTypes = {
    onSubmitCar: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
}