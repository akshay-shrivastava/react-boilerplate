import React, { Component } from 'react'
import PropTypes from 'prop-types'

import SQLEditor from '../SQLEditor'
import { FormControl, FormLabel, FormGroup } from 'react-bootstrap'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import cx from 'classnames'
import './index.scss'

class ScriptEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: false,
      didClearEditor: false
    }
  }

  onTextChange = (editor, data, value) => this.props.onChange(value)

  uploadFile = event => {
    if (event.target.files.length) {
      const file = event.target.files[0]
      this.updateEditorWithFileText(file)
    }
  }

  updateEditorWithFileText = fileTobeRead => {
    if (!fileTobeRead) {
      return
    }
    const fileReader = new FileReader()
    fileReader.onload = () => {
      this.props.onChange(fileReader.result)
      this.setState({
        expanded: true
      })
      // TODO: find a better way to do this
      document.getElementById('sql-file-upload').val = null
    }
    fileReader.readAsText(fileTobeRead)
  }

  renderImportFileLabel = () => {
    const { label, readOnly, required } = this.props
    return (
      <React.Fragment>
        {label && <FormLabel className={required ? 'required' : ''}>{label}</FormLabel>}
        <div className="script-import-label">
          {!readOnly && (
            <React.Fragment>
              {`Type script below or `}
              <FormLabel htmlFor="sql-file-upload" className="upload-label">
                import SQL file
              </FormLabel>
              <FormControl
                type="file"
                className={'hidden'}
                id="sql-file-upload"
                onChange={this.uploadFile}
                ref={ref => (this.fileUpload = ref)}
                disabled={readOnly}
              />
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    )
  }

  resetEditorToTemplate = () => {
    this.props.onChange(this.props.defaultScript)
  }

  clearEditorText = () => {
    this.setState({ didClearEditor: true }, this.props.onChange(null))
  }

  renderTopActions = () => {
    const { script, readOnly, defaultScript } = this.props
    const isScriptLong = this.isScriptLong()

    return (
      <div className="top-action-bar">
        {isScriptLong && this.state.expanded && (
          <div
            className="collapse-button action-button"
            onClick={() => this.setState({ expanded: false })}
            title="Collapse"
          >
            <span>resize-vertical</span>
          </div>
        )}

        {script && (
          <CopyToClipboard text={script}>
            <div className="copy-button action-button" title="Copy to Clipboard">
              <span>duplicate</span>
            </div>
          </CopyToClipboard>
        )}

        {!readOnly && script && (
          <div
            title="Clear Editor"
            onClick={this.clearEditorText}
            className="copy-button action-button"
          >
            <span>erase</span>
          </div>
        )}
        {!readOnly && script !== defaultScript && (
          <div
            title="Reset to delivery template"
            onClick={this.resetEditorToTemplate}
            className="copy-button action-button"
          >
            <span>reset</span>
          </div>
        )}
      </div>
    )
  }

  renderToggleButton = () => {
    const { expanded } = this.state
    const isScriptLong = this.isScriptLong()
    return (
      isScriptLong && (
        <div
          className="expand-toggle"
          onClick={() => {
            this.setState({ expanded: !expanded })
          }}
        >
          <div className="toggle-button">
            {expanded ? 'Click to Collapse' : 'Click to Expand'}
          </div>
        </div>
      )
    )
  }

  isScriptLong = () => {
    const { script, defaultScript } = this.props
    const text = script || defaultScript || ''
    return text.length > 1000 || text.split(/\r\n|\r|\n/).length > 10
  }

  render() {
    const { script, readOnly, placeholder, defaultScript } = this.props
    const { expanded, didClearEditor } = this.state

    return (
      <FormGroup>
        {this.renderImportFileLabel()}
        <div className={cx('expand-wrapper', { expanded, collapsed: !expanded })}>
          {this.renderTopActions()}
          <SQLEditor
            name="sourceQuery"
            placeholder={placeholder}
            onChange={this.onTextChange}
            className="update-script"
            value={script || didClearEditor ? script : defaultScript}
            options={{
              readOnly,
              placeholder,
              autoRefresh: { force: true }
            }}
          />
          {this.renderToggleButton()}
        </div>
      </FormGroup>
    )
  }
}

ScriptEditor.propTypes = {
  label: PropTypes.string,
  script: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  defaultScript: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  placeholder: PropTypes.string
}

ScriptEditor.defaultProps = {
  placeholder: "Add script here.\nUse 'Reset to Template' to begin with template script.",
  readOnly: false
}

export default ScriptEditor
