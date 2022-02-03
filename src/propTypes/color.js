import PropTypes from 'prop-types'

// const hexCode = 

export const colorPropType = PropTypes.shape({
    id: PropTypes.number.isRequired,
    name:PropTypes.string.isRequired,
    hexcode: PropTypes.string.isRequired,
})
