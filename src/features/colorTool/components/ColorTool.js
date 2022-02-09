import { ColorForm } from "./ColorForm"
import { ColorList } from "./ColorList"
import { ToolHeader } from "../../../components/ToolHeader"
import { useColorTool } from "../useColorTool"

export const ColorTool = () => {
    const { colors, addColor } = useColorTool()

    return (
        <>
            <ToolHeader toolName="Color Tool" />
            <ColorList colors={colors} />
            <ColorForm buttonText="Add Color" onSubmitColor={addColor} />
        </>
    )
}
