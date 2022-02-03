import { useState } from "react"
import PropTypes from 'prop-types'
import { upperFirst } from "../util"

export const CarForm = ({
    onSubmitCar,
    addButtonText,
    cancelButtonText,
    onCancel,
}) => {
    const init = {
        make: '',
        model: '',
        year: '',
        color: '',
        price: '',
    }

    const [carForm, setCarForm] = useState(init)
    const [errors, setErrors] = useState({})

    const validateExists = (key, val) =>
        (val === null || val === '') ? `${key} must be supplied` : ''


    const validateNumeric = (key, val) =>
        (val === null || val === '' || isNaN(Number(val))) ? `${key} must be numeric` : ''

    const validate = (key, val) => {
        let myError = null
        switch (key) {
            case 'make':
            case 'model':
            case 'color':
                myError = validateExists(key, val)
                break
            case 'price':
            case 'year':
                myError = validateNumeric(key, val)
                break
            default:
                break;
        }
        setErrors({
            ...errors,
            [key]: myError
        })
        return myError
    }
    const change = ({ target: { name, value } }) => {
        validate(name, value)
        setCarForm({
            ...carForm,
            [name]: value,
        })
    }

    const submit = () => {
        const errorsNow = []
        for (let k in carForm) {
            errorsNow.push(validate(k, carForm[k]))
        }
        const hasErrors = Object.values(errorsNow).filter(a => a).length
        if (hasErrors > 0) {
            return
        }
        onSubmitCar({
            ...carForm,
            year: Number(carForm.year),
            price: Number(carForm.price),
        })
        setCarForm(init)
    }

    return (
        <form style={{ display: 'flex', flexDirection: 'column' }}>
            {Object.keys(init).map(k => (
                <label key={k}>{upperFirst(k)}:
                    {errors[k] && (
                        <div className="errors">{errors[k]}</div>
                    )}
                    <input type="text" name={k} value={carForm[k]} onChange={change} />
                </label>
            ))}
            <div style={{ display: 'flex' }}>
                <button type="button" onClick={submit}>
                    {addButtonText}
                </button>
                <button type="button" onClick={onCancel}>
                    {cancelButtonText}
                </button>
            </div>
        </form>
    )
}

CarForm.propTypes = {
    onSubmitCar: PropTypes.func.isRequired,
    addButtonText: PropTypes.string.isRequired,
    cancelButtonText: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
}