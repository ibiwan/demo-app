
import { CarForm } from "./CarForm"
import { CarTable } from "./CarTable"

import "./CarTool.css"
import { useCarTool } from "../useCarTool"
import { ToolHeader } from "../../../components/ToolHeader"

export const CarTool = () => {
    console.log("render CarTool")

    const {
        cars,
        inAddMode, editCarId,
        setAddMode, setEditMode, resetMode,
        addCar, deleteCar, editCar
    } = useCarTool()

    return (
        <div id="car-tool">
            <ToolHeader toolName="Car Tool" />
            <CarTable
                cars={cars}

                deleteButtonText="Delete Car"
                onDeleteCar={deleteCar}

                editCarId={editCarId}
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
