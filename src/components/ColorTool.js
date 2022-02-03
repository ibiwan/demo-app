import { useObjList } from "../hooks/useObjList"
import { newIdFor } from "../util"
import { ColorForm } from "./ColorForm"
import { ColorList } from "./ColorList"
import { ToolHeader } from "./ToolHeader"

export const ColorTool = (props) => {
    const [colors, addColorToList] = useObjList([...props.colors])

    const addColor = data => addColorToList({ ...data, id: newIdFor(colors) })

    return (
        <>
            <ToolHeader toolName="Color Tool" />
            <ColorList colors={colors} />
            <ColorForm buttonText="Add Color" onSubmitColor={addColor} />
        </>
    )
}
