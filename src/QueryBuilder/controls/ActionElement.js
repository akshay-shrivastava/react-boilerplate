import React from 'react'
import PropTypes from 'prop-types'

export default class ActionElement extends React.Component {
  static get propTypes() {
    return {
      label: PropTypes.string,
      className: PropTypes.string,
      handleOnClick: PropTypes.func,
      disabled: PropTypes.bool
    }
  }

  render() {
    const { label, className, handleOnClick, disabled } = this.props

    return (
      <button onClick={handleOnClick} className={className} disabled={disabled}>
        {label}
      </button>
    )
  }
}
