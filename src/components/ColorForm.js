import { useState } from "react"

export const ColorForm = ({ onSubmitColor, buttonText }) => {
    const initial = {
        name: '', hexcode: '',
    }
    const [colorForm, setColorForm] = useState(initial)

    const change = ({ target: { name, value } }) => {
        setColorForm({
            ...colorForm,
            [name]: value
        })
    }

    const submit = () => {
        onSubmitColor({ ...colorForm })
        setColorForm(initial)
    }

    const { name, hexcode } = colorForm
    return (
        <form>
            <label>
                Name:
                <input type="text" name="name" value={name} onChange={change} />
            </label>

            <label>
                Hexcode:
                <input type="text" name="hexcode" value={hexcode} onChange={change} />
            </label>

            <button type="button" onClick={submit}>
                {buttonText}
            </button>
        </form>
    )
}
