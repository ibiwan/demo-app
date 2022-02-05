import { useColorTool } from "../hooks/useColorTool"
import { newIdFor } from "../util"
import { ColorForm } from "./ColorForm"
import { ColorList } from "./ColorList"
import { ToolHeader } from "./ToolHeader"

export const ColorTool = () => {
    const [colors, addColorToList] = useColorTool()

    const addColor = data => addColorToList({ ...data, id: newIdFor(colors) })

    return (
        <>
            <ToolHeader toolName="Color Tool" />
            <ColorList colors={colors} />
            <ColorForm buttonText="Add Color" onSubmitColor={addColor} />
        </>
    )
}
