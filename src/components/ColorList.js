import PropTypes from 'prop-types'

export const ColorList = ({ colors }) => {
    return (
        <ul>
            {colors.map(({ id, name, hexcode }) =>
                <li key={id} style={{ color: `#${hexcode}` }}>
                    {name} {hexcode}
                </li>
            )}
        </ul>
    )
}

ColorList.defaultProps = {
    colors: [],
}

// run-time, dev only
ColorList.propTypes = {
    colors: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            hexcode: PropTypes.string.isRequired
        })
    ).isRequired,
}
