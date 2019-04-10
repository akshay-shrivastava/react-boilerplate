import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Rule extends Component {
  onFieldChanged = value => {
    this.onElementChanged('field', value)
  }

  onOperatorChanged = value => {
    this.onElementChanged('operator', value)
  }

  onValueChanged = value => {
    this.onElementChanged('value', value)
  }

  onElementChanged = (property, value) => {
    const {
      id,
      schema: { onPropChange }
    } = this.props
    onPropChange(property, value, id)
  }

  removeRule = event => {
    event.preventDefault()
    event.stopPropagation()

    this.props.schema.onRuleRemove(this.props.id, this.props.parentId)
  }

  repeatRule = event => {
    event.preventDefault()
    event.stopPropagation()

    this.props.schema.onRuleRepeat(this.props.id, this.props.parentId)
  }

  disableToggle = event => {
    event.preventDefault()
    event.stopPropagation()

    this.props.schema.onDisableToggle(this.props.id)
  }

  render() {
    const {
      field,
      operator,
      value,
      isDisabled,
      schema: { fields, controls, getOperators, getLevel, classNames },
      editable
    } = this.props
    const level = getLevel(this.props.id)
    return (
      <div className={`rule ${classNames.rule} ${isDisabled ? 'rule-disabled' : ''}`}>
        <div className={'rule-selections-wrapper'}>
          {React.createElement(controls.fieldSelector, {
            options: fields,
            value: field,
            className: `rule-fields ${classNames.fields}`,
            handleOnChange: this.onFieldChanged,
            level,
            disabled: !editable
          })}
          {React.createElement(controls.operatorSelector, {
            field,
            options: getOperators(field),
            value: operator,
            className: `rule-operators ${classNames.operators}`,
            handleOnChange: this.onOperatorChanged,
            level,
            disabled: !editable
          })}
          {React.createElement(controls.valueEditor, {
            field,
            operator,
            value,
            className: `rule-value ${classNames.value}`,
            handleOnChange: this.onValueChanged,
            level,
            disabled: !editable
          })}
        </div>
        {editable && (
          <div className={`rule-actions ${classNames.ruleActions}`}>
            {controls.repeatRuleAction &&
              React.createElement(controls.repeatRuleAction, {
                label: '+',
                className: `rule-repeat ${classNames.repeatRule}`,
                handleOnClick: this.repeatRule,
                level
              })}
            {controls.disableToggleRuleAction &&
              React.createElement(controls.disableToggleRuleAction, {
                label: isDisabled ? 'Enable' : 'Disable',
                className: `rule-disable ${classNames.disableToggle}`,
                handleOnClick: this.disableToggle,
                level,
                isDisabled
              })}
            {controls.removeRuleAction &&
              React.createElement(controls.removeRuleAction, {
                label: 'x',
                className: `rule-remove ${classNames.removeRule}`,
                handleOnClick: this.removeRule,
                level,
                isDisabled
              })}
          </div>
        )}
      </div>
    )
  }
}

Rule.propTypes = {
  id: PropTypes.string,
  parentId: PropTypes.string,
  combinator: PropTypes.string,
  field: PropTypes.string,
  operator: PropTypes.string,
  value: PropTypes.any,
  isDisabled: PropTypes.bool,
  schema: PropTypes.object,
  label: PropTypes.string,
  editable: PropTypes.bool
}

Rule.defaultProps = {
  id: null,
  parentId: null,
  field: null,
  operator: null,
  value: null,
  isDisabled: null,
  schema: null,
  editable: true
}

export default Rule
