import PropTypes from 'prop-types'
import { upperFirst } from "../util"
import { useForm } from "../hooks/useForm"
import { ruleExists, ruleNumeric } from "../hooks/useValidations"

export const CarForm = ({
    onSubmitCar,
    addButtonText,
    cancelButtonText,
    onCancel,
}) => {
    console.log("render CarForm")

    const init = {
        make: '',
        model: '',
        year: '',
        color: '',
        price: '',
    }
    const validationRules = {
        make: ruleExists,
        model: ruleExists,
        color: ruleExists,
        price: ruleNumeric,
        year: ruleNumeric,
    }
    
    const {
        form: carForm,
        change: setCarForm,
        errors,
        validate,
    } = useForm(
        { ...init },
        validationRules
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
            {Object.keys(init).map(k => {
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
    addButtonText: PropTypes.string.isRequired,
    cancelButtonText: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
}