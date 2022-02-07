import { useState } from "react"
import { useCalcTool } from "./useCalcTool"

export const CalcTool = () => {
    const {
        result, error, history,
        add, subtract, multiply, safeDivide,
        clear, deleteHistoryItem,
    } = useCalcTool()

    const [value, setValue] = useState(0)

    // const inputChange = useCallback(e => setValue(e.target.value),[])
    const inputChange = e => setValue(e.target.value)

    // if passing inputChange to some react 
    // component that internally uses useMemo, 
    // use useCallback so we're sending a consistent 
    // function object

    // if usages like these exist somewhere, 
    // we'll want safeDivide to be consistent
    // const blah1 = useMemo(() => {/*---*/ }, [safeDivide])
    // const blah2 = useCallback(() => {/*---*/ }, [safeDivide])

    return (<>
        <input type="text" value={value} onChange={inputChange} />
        <div>result: {result}</div>
        {error && <div>error: {error}</div>}
        <div>
            <button type="button" onClick={() => add(value)}>Add</button>
            <button type="button" onClick={() => subtract(value)}>Subtract</button>
            <button type="button" onClick={() => multiply(value)}>Multiply</button>
            <button type="button" onClick={() => safeDivide(value)}>Divide</button>
            &nbsp;
            <button type="clear" onClick={() => { clear(); setValue(0) }}>Clear</button>
        </div>
        {history.map(({ id, op, val }) => (
            <div key={id}>
                {op} {val}&nbsp;
                <button type="button" onClick={() => { deleteHistoryItem(id) }}>
                    delete
                </button>
            </div>
        ))}
    </>)
}
