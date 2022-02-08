import { useState } from "react"
import { useValidations } from "./useValidations"

export const useForm = (initialForm, validationRules = null) => {
    const [form, setForm] = useState({ ...initialForm })
    const [changesMade, setChangesMade] = useState(false)
    const { validateOne, validateMany, errors } = useValidations(validationRules)

    const change = (evt) => {
        const { target: { name, value, type: targetType } } = evt
        if (validationRules !== null) {
            validateOne(name, value)
        }
        console.log({ name, value })
        setForm({
            ...form,
            [name]: targetType === 'number' ?
                parseInt(value, 10)
                : value,
        })
        setChangesMade(true)
    }

    const resetForm = () => setForm({ ...initialForm })

    return {
        form,
        change,
        changesMade,
        resetForm,
        errors,
        validate: () => validateMany(form)
    }
}
