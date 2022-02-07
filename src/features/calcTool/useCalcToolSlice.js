import { bindActionCreators } from '@reduxjs/toolkit'
import { useCallback, useMemo } from 'react'
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
    const boundActions = useMemo(() => bindActionCreators({
        add,
        subtract,
        multiply,
        clear,
        deleteHistoryItem,
    }, dispatch), [dispatch])

    // all cases: assuming someone farther down includes in deps
    // dependency array: "stale closures" -- avoided by props

    // do these need to be useCallback'd or is useSelector already
    // well-behaved? they're just values, so no need
    const result = useSelector(selectResult)
    const error = useSelector(selectError)
    const history = useSelector(selectHistory).map(h => ({
        ...h,
        op: formatOp(h.op),
    }))

    // since this is just a pure function does it need wrapped?
    // yes, because it's an event handler
    const safeDivide = useCallback((val) => {
        Number(val) === 0 ?
            dispatch(setError('Cannot divide by zero')) :
            dispatch(divide(val))
    }, [dispatch]);

    return {
        result, error, history,

        // are these static-ified? yes, if useMemo on bindActionCreators
        ...boundActions,

        safeDivide,
    }
}