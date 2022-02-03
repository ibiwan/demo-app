import { useState } from "react"
import { newIdFor } from "../util"
import { ColorForm } from "./ColorForm"
import { ColorList } from "./ColorList"
import { ToolHeader } from "./ToolHeader"

export const ColorTool = (props) => {
    const [colors, setColors] = useState([...props.colors])

    const addColor = color => setColors([
        ...colors,
        {
            ...color,
            id: newIdFor(colors)
        }
    ])

    return (
        <>
            <ToolHeader toolName="Color Tool" />
            <ColorList colors={colors} />
            <ColorForm buttonText="Add Color" onSubmitColor={addColor} />
        </>
    )
}

// ColorTool.propTypes = {
//     // colors:
// }