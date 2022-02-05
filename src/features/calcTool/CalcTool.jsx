import { useState } from "react"
import { useCalcTool } from "./useCalcTool"

export const CalcTool = () => {
    const {
        result, error, history,
        add, subtract, multiply, safeDivide,
        clear, deleteHistoryItem,
    } = useCalcTool()

    const [value, setValue] = useState(0)
    const inputChange = e => setValue(e.target.value)

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
            <button type="clear" onClick={() =>{ clear(); setValue(0)}}>Clear</button>
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