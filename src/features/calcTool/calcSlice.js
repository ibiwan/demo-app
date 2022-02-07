import { createAction, createSlice, nanoid } from '@reduxjs/toolkit'

export const add = createAction('add')
export const subtract = createAction('subtract')
export const multiply = createAction('multiply')
export const divide = createAction('divide')

const isValidOp = ({ type }) =>
    [add, subtract, multiply, divide].map(a => a.type).includes(type)

const initialState = {
    // result: 0, 
    error: null,
    history: [],
}

const calcSlice = createSlice({
    name: 'calcToolSlice',
    initialState,
    reducers: {
        setError: (stateSlice, action) => { stateSlice.error = action.payload },
        deleteHistoryItem: (stateSlice, action) => {
            stateSlice.history = stateSlice.history.filter(item => item.id !== action.payload)
        },
        clear: () => initialState
    },
    extraReducers: builder => builder
        // .addCase(add, (stateSlice, action) => { stateSlice.result += Number(action.payload) })
        // .addCase(subtract, (stateSlice, action) => { stateSlice.result -= Number(action.payload) })
        // .addCase(multiply, (stateSlice, action) => { stateSlice.result *= Number(action.payload) })
        // .addCase(divide, (stateSlice, action) => { stateSlice.result /= Number(action.payload) })
        .addMatcher(isValidOp, (stateSlice, action) => {
            stateSlice.error = null
            stateSlice.history.push({
                id: nanoid(),
                op: action.type,
                val: action.payload,
            })
        })
})

export const { clear, setError, deleteHistoryItem } = calcSlice.actions

export const selectResult = state =>
    state.calcToolSlice.history.reduce((acc, { op, val }) => {
        switch (op) {
            case add.type: return acc + Number(val);
            case subtract.type: return acc - Number(val);
            case multiply.type: return acc * Number(val);
            case divide.type: return acc / Number(val);
            default: return acc;
        }
    }, 0)

export const selectError = state => state.calcToolSlice.error
export const selectHistory = state => state.calcToolSlice.history

export const { reducer: calcReducer } = calcSlice
