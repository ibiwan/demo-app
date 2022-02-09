
import { CarForm } from "./CarForm"
import { CarTable } from "./CarTable"

import "./CarTool.css"
import { useCarTool } from "../useCarTool"
import { ToolHeader } from "../../../components/ToolHeader"
import { useContext } from "react"
import { CarToolStringsContext } from "../carToolStringsContext"

export const CarTool = () => {
    const {
        cars,
        inAddMode, editCarId,
        setAddMode, setEditMode, resetMode,
        loading,
        addCar, deleteCar, editCar,
        sortMode, setSortMode,
    } = useCarTool()

    const strings = useContext(CarToolStringsContext)

    return (
        <div id="car-tool">
            <ToolHeader toolName="Car Tool" />
            {loading && <h1>LOADING</h1>}
            <CarTable
                cars={cars}
                sortMode={sortMode}
                setSortMode={setSortMode}
                onDeleteCar={deleteCar}
                editCarId={editCarId}
                onSelectEditCar={id => setEditMode(id)}
                onSubmitEditCar={editCar}
                onCancel={resetMode}
                strings={strings}
            />
            {!inAddMode && <button
                type="button"
                onClick={setAddMode}
            >
                {strings.addButtonText}
            </button>}
            {inAddMode && <CarForm
                onSubmitCar={addCar}
                onCancel={resetMode}
                strings={strings}
            />}
        </div >
    )
}
