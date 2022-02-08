import { useContext } from "react"
import { CarToolStringsContext } from "../carToolStringsContext"

export const CarViewActions = ({
    car,
    onDeleteCar,
    onSelectEditCar,
}) => {
    const { deleteButtonText, editButtonText } = useContext(CarToolStringsContext)

    return (
        <>
            <button onClick={() => { onDeleteCar(car) }}>
                {deleteButtonText}
            </button>
            <button onClick={() => { onSelectEditCar(car.id) }}>
                {editButtonText}
            </button>
        </>
    )
}
