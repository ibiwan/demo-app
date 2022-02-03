import PropTypes from 'prop-types'

const carPropTypeBaseShape = {
    id: PropTypes.number.isRequired,
    make: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
}

export const carPropType = PropTypes.shape(
    carPropTypeBaseShape
)

export const carsPropType = PropTypes.arrayOf(carPropType)

export const carRowPropType = PropTypes.shape({
    ...carPropTypeBaseShape,
    actions: PropTypes.element.isRequired,
})

export const carRowsPropType = PropTypes.arrayOf(carRowPropType)

export const carTableColumnDefType = PropTypes.shape({
    key: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    fmt: PropTypes.func,
    sortable: PropTypes.bool,
    editable: PropTypes.bool,
})

export const carTableColumnsDefType = PropTypes.arrayOf(carTableColumnDefType)
