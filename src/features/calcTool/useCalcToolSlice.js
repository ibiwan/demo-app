import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import {
    add, subtract, multiply, divide,
    setError, clear, deleteHistoryItem,
    selectResult, selectError, selectHistory,
} from './calcSlice'

const formatOp = actionType => {
    switch (actionType) {
        case add.type: return '+';
        case subtract.type: return '-';
        case multiply.type: return 'x';
        case divide.type: return '÷';
        default: return '';
    }
}

export const useCalcToolSlice = () => {
    const dispatch = useDispatch()
    const boundActions = bindActionCreators({
        add,
        subtract,
        multiply,
        clear,
        deleteHistoryItem,
    }, dispatch)

    const result = useSelector(selectResult)
    const error = useSelector(selectError)
    const history = useSelector(selectHistory).map(h => ({
        ...h,
        op: formatOp(h.op),
    }))

    const safeDivide = (val) => {
        Number(val) === 0 ?
            dispatch(setError('Cannot divide by zero')) :
            dispatch(divide(val))
    }

    return {
        result, error, history,
        ...boundActions,
        safeDivide,
    }
}