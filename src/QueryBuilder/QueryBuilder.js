import uniqueId from 'cuid'
import cloneDeep from 'lodash/cloneDeep'
import isEqual from 'lodash/isEqual'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import RuleGroup from './RuleGroup'
import { ActionElement, ValueEditor, ValueSelector } from './controls/index'
import { controlClassnames, fields, combinators, operators } from './default-config'
import './styles/index.scss'

class QueryBuilder extends Component {
  static get defaultOperators() {
    return operators
  }

  static get defaultCombinators() {
    return combinators
  }

  static get defaultControlClassnames() {
    return controlClassnames
  }

  static get defaultControlElements() {
    return {
      addGroupAction: ActionElement,
      removeGroupAction: ActionElement,
      addRuleAction: ActionElement,
      removeRuleAction: ActionElement,
      disableToggleRuleGroupAction: ActionElement,
      disableToggleRuleAction: ActionElement,
      minimizeToggleAction: ActionElement,
      combinatorSelector: ValueSelector,
      fieldSelector: ValueSelector,
      operatorSelector: ValueSelector,
      valueEditor: ValueEditor,
      clearQueryTree: ActionElement,
      repeatRuleGroupAction: ActionElement,
      repeatRuleAction: ActionElement
    }
  }

  constructor(...args) {
    super(...args)
    this.state = {
      root: {},
      schema: {}
    }
  }

  componentWillMount() {
    const {
      fields,
      operators,
      combinators,
      controlElements,
      controlClassnames
    } = this.props
    const classNames = Object.assign(
      {},
      QueryBuilder.defaultControlClassnames,
      controlClassnames
    )
    const controls = Object.assign(
      {},
      QueryBuilder.defaultControlElements,
      controlElements
    )
    this.setState({
      root: this.getInitialQuery(),
      schema: {
        fields,
        operators,
        combinators,

        classNames,

        createRule: this.createRule.bind(this),
        createRuleGroup: this.createRuleGroup.bind(this),
        onRuleAdd: this.notifyQueryChange.bind(this, 'onRuleAdd', this.onRuleAdd),
        onGroupAdd: this.notifyQueryChange.bind(this, 'onGroupAdd', this.onGroupAdd),
        onRuleRemove: this.notifyQueryChange.bind(
          this,
          'onRuleRemove',
          this.onRuleRemove
        ),
        onDisableToggle: this.notifyQueryChange.bind(
          this,
          'onDisableToggle',
          this.onDisableToggle
        ),
        onMinimizeToggle: this.notifyQueryChange.bind(
          this,
          'onMinimizeToggle',
          this.onMinimizeToggle
        ),
        onGroupRemove: this.notifyQueryChange.bind(
          this,
          'onGroupRemove',
          this.onGroupRemove
        ),
        onPropChange: this.notifyQueryChange.bind(
          this,
          'onPropChange',
          this.onPropChange
        ),
        onRuleGroupTitleChanged: this.notifyQueryChange.bind(
          this,
          'onRuleGroupTitleChanged',
          this.onRuleGroupTitleChanged
        ),
        getLevel: this.getLevel.bind(this),
        isRuleGroup: this.isRuleGroup.bind(this),
        controls,
        getOperators: (...args) => this.getOperators(...args),
        onClearQueryTree: this.props.onClearQueryTree,
        onRuleRepeat: this.notifyQueryChange.bind(
          this,
          'onRuleRepeat',
          this.onRuleRepeat
        ),
        onRepeatRuleGroup: this.notifyQueryChange.bind(
          this,
          'onRepeatRuleGroup',
          this.onRepeatRuleGroup
        )
      }
    })
  }

  componentWillReceiveProps(props) {
    if (props.query && !isEqual(this.state.root, props.query)) {
      this.setState({ root: props.query })
    }
  }

  getInitialQuery() {
    return this.props.query || this.createRuleGroup()
  }

  onRuleGroupTitleChanged = payload => {
    const rule = this.findRule(payload.id, this.state.root)
    Object.assign(rule, { ruleGroupLabel: payload.value })
    this.setState({ root: this.state.root })
  }
  isRuleGroup(rule) {
    return !!(rule.combinator && rule.rules)
  }

  createRule() {
    const { fields } = this.props
    if (fields && fields.length > 0) {
      return {
        id: `r-${uniqueId()}`,
        field: fields[0].name,
        value: '',
        operator: this.getOperators(fields[0].name)[0].name
      }
    }
  }

  createRuleGroup() {
    const rule = this.createRule()
    return {
      id: `g-${uniqueId()}`,
      rules: rule ? [rule] : [],
      combinator: this.props.combinators[0].name,
      isDisabled: false,
      isMinimized: false,
      ruleGroupLabel: ''
    }
  }

  getOperators(field) {
    if (this.props.getOperators) {
      const ops = this.props.getOperators(field)
      if (ops) {
        return ops
      }
    }
    return this.props.operators
  }

  onRuleAdd(rule, parentId) {
    const parent = this.findRule(parentId, this.state.root)
    parent.rules.push(rule)

    this.setState({ root: this.state.root })
  }

  onGroupAdd(group, parentId) {
    const parent = this.findRule(parentId, this.state.root)
    parent.rules.push(group)

    this.setState({ root: this.state.root })
  }

  onPropChange(prop, value, ruleId) {
    const rule = this.findRule(ruleId, this.state.root)
    Object.assign(rule, { [prop]: value })
    // when prop === field change operator as well
    if (prop === 'field') {
      rule.operator = this.getOperators(value)[0].name
      rule.value = ''
    }
    this.setState({ root: this.state.root })
  }

  onRuleRemove(ruleId, parentId) {
    const parent = this.findRule(parentId, this.state.root)
    const index = parent.rules.findIndex(rule => rule.id === ruleId)

    parent.rules.splice(index, 1)
    this.setState({ root: this.state.root })
  }

  onRuleRepeat = (ruleId, parentId) => {
    const parent = this.findRule(parentId, this.state.root)
    const index = parent.rules.findIndex(rule => rule.id === ruleId)

    parent.rules.splice(index + 1, 0, {
      id: `r-${uniqueId()}`,
      field: parent.rules[index].field,
      value: '',
      operator: parent.rules[index].operator
    })
    this.setState({ root: this.state.root })
  }

  copyAllRulesUnderGroup(originalRuleList) {
    const { isRuleGroup } = this.state.schema
    const ruleList = []
    for (const rule of originalRuleList) {
      if (isRuleGroup(rule)) {
        ruleList.push({
          id: `g-${uniqueId()}`,
          rules: this.copyAllRulesUnderGroup(rule.rules),
          combinator: rule.combinator,
          isDisabled: false,
          isMinimized: false,
          ruleGroupLabel: ''
        })
      } else {
        ruleList.push({
          id: `r-${uniqueId()}`,
          field: rule.field,
          value: '',
          operator: rule.operator
        })
      }
    }
    return ruleList
  }

  onRepeatRuleGroup(groupId, parentId) {
    const parent = this.findRule(parentId, this.state.root)
    const index = parent.rules.findIndex(group => group.id === groupId)

    parent.rules.splice(index + 1, 0, {
      id: `g-${uniqueId()}`,
      rules: this.copyAllRulesUnderGroup(parent.rules[index].rules),
      combinator: parent.rules[index].combinator,
      isDisabled: false,
      isMinimized: false,
      ruleGroupLabel: ''
    })
    this.setState({ root: this.state.root })
  }

  onDisableToggle(ruleId) {
    const rule = this.findRule(ruleId, this.state.root)
    rule.isDisabled = !rule.isDisabled
    this.forceUpdate()
  }

  onClearQueryTree() {
    this.setState({
      ...this.state,
      root: {}
    })
  }

  onMinimizeToggle(ruleId) {
    const rule = this.findRule(ruleId, this.state.root)
    rule.isMinimized = !rule.isMinimized
    this.forceUpdate()
  }

  onGroupRemove(groupId, parentId) {
    const parent = this.findRule(parentId, this.state.root)
    const index = parent.rules.findIndex(group => group.id === groupId)

    parent.rules.splice(index, 1)
    this.setState({ root: this.state.root })
  }

  getLevel(id) {
    return this._getLevel(id, 0, this.state.root)
  }

  _getLevel(id, index, root) {
    const { isRuleGroup } = this.state.schema

    let foundAtIndex = -1
    if (root.id === id) {
      foundAtIndex = index
    } else if (isRuleGroup(root)) {
      root.rules.forEach(rule => {
        if (foundAtIndex === -1) {
          let indexForRule = index
          if (isRuleGroup(rule)) {
            indexForRule++
          }
          foundAtIndex = this._getLevel(id, indexForRule, rule)
        }
      })
    }
    return foundAtIndex
  }

  findRule(id, parent) {
    const { isRuleGroup } = this.state.schema

    if (parent.id === id) {
      return parent
    }

    for (const rule of parent.rules) {
      if (rule.id === id) {
        return rule
      } else if (isRuleGroup(rule)) {
        const subRule = this.findRule(id, rule)
        if (subRule) {
          return subRule
        }
      }
    }
  }

  notifyQueryChange(event, fn, ...args) {
    if (fn) {
      fn.call(this, ...args)
    }
    const { onQueryChange } = this.props
    if (onQueryChange) {
      const query = cloneDeep(this.state.root)
      onQueryChange(query, event, ...args)
    }
  }

  render() {
    const {
      root: { id, rules, combinator, isDisabled, isMinimized, ruleGroupLabel } = {},
      schema
    } = this.state || {}
    return (
      <div className={`queryBuilder ${schema.classNames.queryBuilder}`}>
        <RuleGroup
          rules={rules}
          combinator={combinator}
          schema={schema}
          id={id}
          parentId={null}
          isDisabled={isDisabled}
          isMinimized={isMinimized}
          ruleGroupLabel={ruleGroupLabel}
          editable={this.props.editable}
        />
      </div>
    )
  }
}

QueryBuilder.defaultProps = {
  fields,
  operators: QueryBuilder.defaultOperators,
  combinators: QueryBuilder.defaultCombinators,
  editable: true
}

QueryBuilder.propTypes = {
  query: PropTypes.object,
  fields: PropTypes.array.isRequired,
  operators: PropTypes.array,
  combinators: PropTypes.array,
  controlElements: PropTypes.shape({
    addGroupAction: PropTypes.func,
    removeGroupAction: PropTypes.func,
    addRuleAction: PropTypes.func,
    removeRuleAction: PropTypes.func,
    disableToggleRuleGroupAction: PropTypes.func,
    disableToggleRuleAction: PropTypes.func,
    combinatorSelector: PropTypes.func,
    fieldSelector: PropTypes.func,
    operatorSelector: PropTypes.func,
    valueEditor: PropTypes.func
  }),
  getOperators: PropTypes.func,
  onQueryChange: PropTypes.func,
  controlClassnames: PropTypes.object,
  onRuleGroupTitleChanged: PropTypes.func,
  ruleGroupLabel: PropTypes.string,
  onClearQueryTree: PropTypes.func,
  editable: PropTypes.bool
}

export default QueryBuilder
