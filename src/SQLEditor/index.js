import React from 'react'
import PropTypes from 'prop-types'

import { Controlled as Codemirror } from 'react-codemirror2'

import 'codemirror/addon/display/placeholder'
import 'codemirror/mode/sql/sql'
import 'codemirror/addon/hint/show-hint'
import 'codemirror/addon/hint/sql-hint'
import 'codemirror/addon/display/autorefresh'

import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/hint/show-hint.css'
import './index.scss'

const defaultOptions = {
  lineWrapping: true,
  lineNumbers: true,
  mode: 'text/x-sql',
  tabSize: 2,
  extraKeys: { 'Ctrl-Space': 'autocomplete' }
}

const SQLEditor = ({
  value,
  defaultQuery,
  onChange,
  options,
  name,
  className,
  autoFocus
}) => {
  options = {
    ...defaultOptions,
    ...options
  }
  return (
    <Codemirror
      className={`${className} cm-sql-query-sf-input`}
      name={name}
      value={value}
      placeholder={defaultQuery}
      onBeforeChange={onChange}
      autoFocus={autoFocus}
      options={options}
    />
  )
}

SQLEditor.propTypes = {
  value: PropTypes.string,
  defaultQuery: PropTypes.string,
  options: PropTypes.object,
  onChange: PropTypes.func,
  className: PropTypes.string,
  name: PropTypes.string,
  autoFocus: PropTypes.bool
}

SQLEditor.defaultProps = {
  className: '',
  autoFocus: false,
  onChange: () => {}
}

export default SQLEditor
