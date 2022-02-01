import { CarForm } from "./CarForm"
import { CarTable } from "./CarTable"
import "./CarTool.css"
import { ToolHeader } from "./ToolHeader"

export const CarTool = ({ cars }) => {
    return (
        <div id="car-tool">
            <ToolHeader toolName="Car Tool" />
            <CarTable cars={cars} />
            <CarForm />
        </div >
    )
}
