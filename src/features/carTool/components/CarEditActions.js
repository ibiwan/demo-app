import { useContext } from "react"
import { CarToolStringsContext } from "../carToolStringsContext"

export const CarEditActions = ({
    carForm,
    changesMade,
    onSubmitEditCar,
    onCancel,
}) => {
    const { saveEditButtonText, cancelButtonText } = useContext(CarToolStringsContext)

    return (
        <>
            <button
                onClick={() => { onSubmitEditCar({ ...carForm }) }}
                disabled={!changesMade}
            >
                {saveEditButtonText}
            </button>
            <button
                onClick={() => onCancel()}
            >
                {cancelButtonText}
            </button>
        </>
    )
}
