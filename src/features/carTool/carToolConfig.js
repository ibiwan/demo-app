import { ruleExists, ruleNumeric } from "../../hooks/useValidations"

export const initialCars = [
    {
        id: 68,
        make: 'Honda',
        model: 'Civic LX',
        year: 2010,
        color: 'Gray',
        price: 23000
    },
    {
        id: 89,
        make: 'Kia',
        model: 'Soul +',
        year: 2011,
        color: 'Blue',
        price: 17000
    },
]

export const emptyCarForm = {
    make: '',
    model: '',
    year: '',
    color: '',
    price: '',
}

export const carFormValidationRules = {
    make: ruleExists,
    model: ruleExists,
    color: ruleExists,
    price: ruleNumeric,
    year: ruleNumeric,
}

