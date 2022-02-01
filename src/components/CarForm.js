import { useState } from "react"

export const CarForm = () => {
    const [carForm, setCarForm] = useState(
        {
            make: '',
            model: '',
            year: '',
            color: '',
            price: '',
        }
    )

    const change = ({ target: { name, value } }) => {
        setCarForm({
            ...carForm,
            [name]: value,
        })
    }

    console.log(carForm)

    const { make, model, year, color, price } = carForm
    return (
        <form style={{ display: 'flex', flexDirection: 'column' }}>
            <label>Make:
                <input type="text" name="make" value={make} onChange={change} />
            </label>
            <label>
                Model:<input type="text" name="model" value={model} onChange={change} />
            </label>
            <label>
                Year:<input type="text" name="year" value={year} onChange={change} />
            </label>
            <label>
                Color:<input type="text" name="color" value={color} onChange={change} />
            </label>
            <label>
                Price:<input type="text" name="price" value={price} onChange={change} />
            </label>
        </form>
    )
}