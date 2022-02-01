import { useState } from "react"
import { ColorForm } from "./ColorForm"
import { ColorList } from "./ColorList"
import { ToolHeader } from "./ToolHeader"

export const ColorTool = (props) => {
    const [colors, setColors] = useState([...props.colors])

    const addColor = color => setColors([
        ...colors,
        {
            ...color,
            id: Math.max(...colors.map(c => c.id), 0) + 1
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
