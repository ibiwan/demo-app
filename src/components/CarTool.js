
import { CarForm } from "./CarForm"
import { CarTable } from "./CarTable"
import { ToolHeader } from "./ToolHeader"

import "./CarTool.css"
import { useCarTool } from "../hooks/useCarTool"

export const CarTool = () => {
    console.log("render CarTool")

    const {
        inAddMode, editModeId,
        setAddMode, setEditMode, resetMode,
        carsList, addCar, deleteCar, editCar
    } = useCarTool()

    return (
        <div id="car-tool">
            <ToolHeader toolName="Car Tool" />
            <CarTable
                cars={carsList}

                deleteButtonText="Delete Car"
                onDeleteCar={deleteCar}

                editCarId={editModeId}
                editButtonText="Edit Car"
                onSelectEditCar={id => setEditMode(id)}
                saveEditButtonText="Save Changes"
                onSubmitEditCar={editCar}

                cancelButtonText="Cancel"
                onCancel={resetMode}
            />
            {!inAddMode && <button
                type="button"
                onClick={setAddMode}>
                Add Car
            </button>}
            {inAddMode && <CarForm
                addButtonText="Add Car"
                onSubmitCar={addCar}

                cancelButtonText="Cancel"
                onCancel={resetMode}
            />}
        </div >
    )
}
