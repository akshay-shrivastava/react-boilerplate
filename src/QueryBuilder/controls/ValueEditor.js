import React from 'react'
import PropTypes from 'prop-types'

export default class ValueEditor extends React.Component {
  static get propTypes() {
    return {
      field: PropTypes.string,
      operator: PropTypes.string,
      value: PropTypes.string,
      handleOnChange: PropTypes.func,
      disabled: PropTypes.bool
    }
  }

  render() {
    const { operator, value, handleOnChange, disabled } = this.props

    if (operator === 'null' || operator === 'notNull') {
      return null
    }

    return (
      <input
        type="text"
        value={value}
        onChange={e => handleOnChange(e.target.value)}
        disabled={disabled}
      />
    )
  }
}
