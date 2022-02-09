import PropTypes from 'prop-types'
import { useForm } from '../../../hooks/useForm'


export const ColorForm = ({ onSubmitColor, buttonText }) => {
    const initial = {
        name: '', hexcode: '',
    }

    const {
        form: colorForm,
        change: setColorForm,
        resetForm
    } = useForm({ ...initial })

    const submit = () => {
        onSubmitColor({ ...colorForm })
        resetForm(initial)
    }

    const { name, hexcode } = colorForm
    return (
        <form>
            <label>
                Name:
                <input type="text" name="name" value={name} onChange={setColorForm} />
            </label>

            <label>
                Hexcode:
                <input type="text" name="hexcode" value={hexcode} onChange={setColorForm} />
            </label>

            <button type="button" onClick={submit}>
                {buttonText}
            </button>
        </form>
    )
}

ColorForm.propTypes = {
    onSubmitColor: PropTypes.func.isRequired,
    buttonText: PropTypes.string.isRequired
}