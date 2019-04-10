import React, { Component } from 'react'
import Rule from './Rule'
import PropTypes from 'prop-types'

class RuleGroup extends Component {
  addGroupLabel = event => {
    const newLabel = {
      id: event.target.id,
      value: event.target.value
    }
    this.props.schema.onRuleGroupTitleChanged(newLabel)
  }

  hasParentGroup() {
    return this.props.parentId
  }

  onCombinatorChange = value => {
    const { onPropChange } = this.props.schema

    onPropChange('combinator', value, this.props.id)
  }

  addRule = event => {
    event.preventDefault()
    event.stopPropagation()

    const { createRule, onRuleAdd } = this.props.schema

    const newRule = createRule()
    onRuleAdd(newRule, this.props.id)
  }

  addGroup = event => {
    event.preventDefault()
    event.stopPropagation()

    const { createRuleGroup, onGroupAdd } = this.props.schema
    const newGroup = createRuleGroup()
    onGroupAdd(newGroup, this.props.id)
  }

  removeGroup = event => {
    event.preventDefault()
    event.stopPropagation()

    this.props.schema.onGroupRemove(this.props.id, this.props.parentId)
  }

  repeatRuleGroup = event => {
    event.preventDefault()
    event.stopPropagation()
    this.props.schema.onRepeatRuleGroup(this.props.id, this.props.parentId)
  }

  disableToggle = event => {
    event.preventDefault()
    event.stopPropagation()

    this.props.schema.onDisableToggle(this.props.id)
  }

  emptyQueryTree = event => {
    event.preventDefault()
    event.stopPropagation()
    this.props.schema.onClearQueryTree()
  }

  minimizeToggle = event => {
    event.preventDefault()
    event.stopPropagation()

    this.props.schema.onMinimizeToggle(this.props.id)
  }

  render() {
    const {
      combinator,
      rules,
      isDisabled,
      isMinimized,
      schema: {
        combinators,
        controls,
        onRuleRemove,
        onDisableToggle,
        onMinimizeToggle,
        isRuleGroup,
        getLevel,
        classNames,
        onRuleGroupTitleChanged
      },
      editable
    } = this.props
    const level = getLevel(this.props.id)
    return (
      <div
        className={`ruleGroup ${classNames.ruleGroup}
          combinator-${combinator} ${isDisabled ? 'rule-disabled' : ''}
          ${isMinimized ? 'ruleGroup-minimized' : ''}`}
      >
        <div className="ruleGroup-header">
          {controls.combinatorSelector &&
            React.createElement(controls.combinatorSelector, {
              options: combinators,
              value: combinator,
              className: `ruleGroup-combinators ${classNames.combinators}`,
              handleOnChange: this.onCombinatorChange,
              rules,
              level,
              disabled: !editable
            })}
          {
            <input
              type={this.props.id === 'g-default' ? 'hidden' : 'text'}
              placeholder="Enter Name"
              className="qb-group-label"
              id={this.props.id}
              value={this.props.ruleGroupLabel}
              onChange={this.addGroupLabel}
              onKeyDown={event => {
                if (event.keyCode === 13 || event.keyCode === 27) {
                  event.target.blur()
                }
              }}
              name="name"
              title="Click to edit"
              disabled={!editable}
            />
          }
          {<span className="rule-summary">{`(${rules.length})`}</span>}
          {editable && (
            <div className={`ruleGroup-actions ${classNames.ruleGroupActions}`}>
              {this.hasParentGroup() && controls.repeatRuleGroupAction
                ? React.createElement(controls.repeatRuleGroupAction, {
                    label: '+',
                    className: `rule-repeat ${classNames.repeatRule}`,
                    handleOnClick: this.repeatRuleGroup,
                    level
                  })
                : null}
              {controls.disableToggleRuleGroupAction &&
                React.createElement(controls.disableToggleRuleGroupAction, {
                  label: isDisabled ? 'Enable' : 'Disable',
                  className: `ruleGroup-disable ${classNames.disableToggle}`,
                  handleOnClick: this.disableToggle,
                  level,
                  isDisabled
                })}
              {!this.hasParentGroup() && controls.emptyQueryTree
                ? React.createElement(controls.emptyQueryTree, {
                    label: 'Empty Query Tree',
                    className: `ruleGroup-disable ${classNames.emptyQueryTree}`,
                    handleOnClick: this.emptyQueryTree,
                    level,
                    isDisabled
                  })
                : null}
              {this.hasParentGroup() && controls.removeGroupAction
                ? React.createElement(controls.removeGroupAction, {
                    label: 'x',
                    className: `ruleGroup-remove ${classNames.removeGroup}`,
                    handleOnClick: this.removeGroup,
                    rules,
                    level
                  })
                : null}
            </div>
          )}

          {controls.minimizeToggleAction &&
            React.createElement(controls.minimizeToggleAction, {
              label: isMinimized ? 'Show' : 'Hide',
              className: `ruleGroup-minimize ${isMinimized ? 'open' : 'closed'} ${
                classNames.minimizeToggle
              }`,
              handleOnClick: this.minimizeToggle,
              level,
              isMinimized
            })}
        </div>
        {!isMinimized && (
          <div className={'rule-list'}>
            {rules.map(rule => {
              return isRuleGroup(rule) ? (
                <RuleGroup
                  key={rule.id}
                  id={rule.id}
                  label={rule.label}
                  isDisabled={rule.isDisabled}
                  isMinimized={rule.isMinimized}
                  schema={this.props.schema}
                  parentId={this.props.id}
                  combinator={rule.combinator}
                  rules={rule.rules}
                  ruleGroupLabel={rule.ruleGroupLabel}
                  onDisableToggle={onDisableToggle}
                  onRuleGroupTitleChanged={onRuleGroupTitleChanged}
                  onMinimizeToggle={onMinimizeToggle}
                  editable={this.props.editable}
                />
              ) : (
                <Rule
                  key={rule.id}
                  id={rule.id}
                  field={rule.field}
                  value={rule.value}
                  label={rule.label}
                  operator={rule.operator}
                  isDisabled={rule.isDisabled}
                  schema={this.props.schema}
                  parentId={this.props.id}
                  onRuleRemove={onRuleRemove}
                  onDisableToggle={onDisableToggle}
                  editable={this.props.editable}
                />
              )
            })}
          </div>
        )}
        {!isMinimized && (
          <div className="add-rule-wrapper">
            {controls.addRuleAction &&
              React.createElement(controls.addRuleAction, {
                label: '+Rule',
                className: `ruleGroup-addRule ${classNames.addRule}`,
                handleOnClick: this.addRule,
                rules,
                level,
                disabled: !editable
              })}
            {controls.addGroupAction &&
              React.createElement(controls.addGroupAction, {
                label: '+Group',
                className: `ruleGroup-addGroup ${classNames.addGroup}`,
                handleOnClick: this.addGroup,
                rules,
                level,
                disabled: !editable
              })}
          </div>
        )}
      </div>
    )
  }
}

RuleGroup.propTypes = {
  id: PropTypes.string,
  parentId: PropTypes.string,
  combinator: PropTypes.string,
  rules: PropTypes.arrayOf(PropTypes.object),
  isDisabled: PropTypes.bool,
  isMinimized: PropTypes.bool,
  schema: PropTypes.object,
  onRuleGroupTitleChanged: PropTypes.func,
  ruleGroupLabel: PropTypes.string,
  editable: PropTypes.bool
}

RuleGroup.defaultProps = {
  id: null,
  parentId: null,
  isDisabled: false,
  isMinimized: false,
  rules: [],
  combinator: 'and',
  schema: {},
  editable: true
}

export default RuleGroup
