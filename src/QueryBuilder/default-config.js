export const fields = [
  { name: 'field1', label: 'Field 1' },
  { name: 'field2', label: 'Field 2' },
  { name: 'field3', label: 'Field 3' }
]

export const operators = [
  { name: 'matches', label: 'is' },
  { name: 'notMatches', label: 'is not' }
]

export const combinators = [{ name: 'and', label: 'AND' }, { name: 'or', label: 'OR' }]

export const controlClassnames = {
  queryBuilder: 'query-builder', // Root <div> element
  combinators: 'qb-combinators', // <select> control for combinators
  disableToggle: 'qb-disable-toggle',
  ruleGroup: 'qb-rule-group', // <div> containing the RuleGroup
  rule: 'qb-rule', // <div> containing the Rule
  addGroup: 'qb-add-group', // <button> to add a RuleGroup
  addRule: 'qb-add-rule', // <button> to add a Rule
  removeGroup: 'ab-remove-group', // <button> to remove a RuleGroup
  removeRule: 'qb-remove-rule', // <button> to remove a Rule
  ruleGroupActions: '',
  ruleActions: '',
  fields: 'qb-fields', // <select> control for fields
  operators: 'qb-operators', // <select> control for operators
  value: 'qb-value', // <input> for the field value
  repeatRule: 'qb-repeat-rule',
  clearQueryTree: '',
  minimizeToggle: '',
  emptyQueryTree: 'qb-empty-query-tree' // <button> to clear query tree
}
