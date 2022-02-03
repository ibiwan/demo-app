
import { carsPropType } from "../propTypes/car"
import { CarForm } from "./CarForm"
import { CarTable } from "./CarTable"
import { ToolHeader } from "./ToolHeader"

import "./CarTool.css"
import { useCarToolStore } from "../hooks/useCarToolStore"

export const CarTool = ({ cars }) => {
    const {
        inAddMode, editModeId,
        setAddMode, setEditMode, resetMode,
        carsList, addCar, deleteCar, editCar
    } = useCarToolStore([...cars])

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

CarTool.propTypes = {
    cars: carsPropType.isRequired
}
