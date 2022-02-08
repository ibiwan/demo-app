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

const nf = new Intl.NumberFormat('en-US')

export const tableColumns = [
    {
        key: 'id', label: 'Id',
        editable: false,
    },
    { key: 'year', label: 'Year', },
    { key: 'make', label: 'Make' },
    { key: 'model', label: 'Model[trim]' },
    { key: 'color', label: 'Color' },
    {
        key: 'price', label: 'Price New',
        fmt: v => `$${nf.format(v)}`,
    },
    {
        key: 'actions', label: 'Actions',
        sortable: false, editable: false,
    },
]

export const strings = {
    deleteButtonText:"Delete Car",
    editButtonText:"Edit Car",
    saveEditButtonText:"Save Changes",
    addButtonText:"Add Car",
    cancelButtonText:"Cancel",
}