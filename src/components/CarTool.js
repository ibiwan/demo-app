import { useState } from "react"

import { carsPropType } from "../propTypes/car"
import { newIdFor } from "../util"
import { CarForm } from "./CarForm"
import { CarTable } from "./CarTable"
import { ToolHeader } from "./ToolHeader"

import "./CarTool.css"

export const CarTool = ({ cars }) => {
    const defaultMode = { mode: 'default', editCarId: null }
    const [mode, setMode] = useState({ ...defaultMode })
    const [carsData, setCarsData] = useState([...cars])

    const addCar = car => {
        setMode({ mode: 'default', editCarId: null })
        setCarsData([
            ...carsData,
            {
                ...car,
                id: newIdFor(carsData)
            }
        ])
    }

    const deleteCar = car => {
        setCarsData(
            carsData.filter(c => c.id !== car.id)

        )
        setMode({ ...defaultMode })
    }

    const editCar = (car,) => {
        setCarsData([...carsData].map(c => {
            if (c.id !== car.id) { return c }
            return { ...c, ...car }
        })
        )
        setMode({ ...defaultMode })
    }

    return (
        <div id="car-tool">
            <ToolHeader toolName="Car Tool" />
            <CarTable
                cars={carsData}
                deleteButtonText="Delete Car"
                onDeleteCar={deleteCar}
                editCarId={mode.editCarId}
                editButtonText="Edit Car"
                onSelectEditCar={id => setMode({ mode: 'edit', editCarId: id })}
                saveEditButtonText="Save Changes"
                onSubmitEditCar={editCar}
                cancelButtonText="Cancel"
                onCancel={() => setMode({ ...defaultMode })}
            />
            {mode.mode !== 'add' && <button
                type="button"
                onClick={
                    () => setMode({ mode: 'add' })
                }>
                Add Car
            </button>}
            {mode.mode === 'add' && <CarForm
                addButtonText="Add Car"
                onSubmitCar={addCar}
                cancelButtonText="Cancel"
                onCancel={() => setMode({ ...defaultMode })}
            />}
        </div >
    )
}

CarTool.propTypes = {
    cars: carsPropType.isRequired
}
