import { useState } from "react"

export const useValidations = rules => {
    const [errors, setErrors] = useState({})

    const setError = (key, error) =>
        setErrors({
            ...errors,
            [key]: error
        })

    const validateOne = (key, value) => {
        if (rules[key]) {
            const e = rules[key](key, value)
            setError(key, e)

            return e
        }
    }

    const validateMany = (data) => {
        const results = Object.entries(data).reduce(
            (results, [k, v]) => {
                results[k] = validateOne(k, v)
                return results
            }, {})
        // each validateOne call sets
        // but stomps previous by reusing 
        // this render's starting value
        setErrors(results)

        return results
    }

    return {
        validateOne,
        validateMany,
        errors,
    }
}

export const ruleExists = (key, val) =>
    (val === undefined || val === null || val === '') ? `${key} must be supplied` : ``

export const ruleNumeric = (key, val) =>
    (val === null || val === '' || isNaN(Number(val))) ? `${key} must be numeric` : ''
