import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchBodyData } from './action'
import ScriptEditor from '../ScriptEditor'

class Body extends Component {
  constructor(props) {
    super(props)
    this.state = {
      updateScript: '',
      scriptTemplate: ''
    }
  }
  handleScriptChange = val => {
    this.setState(() => ({ updateScript: val }))
  }
  render() {
    return (
      <ScriptEditor
        required
        label="Script Editor"
        readOnly={false}
        script={this.state.updateScript}
        defaultScript={this.state.scriptTemplate}
        onChange={this.handleScriptChange}
      />
    )
  }
}

Body.propTypes = {
  bodyData: PropTypes.string,
  fetchBodyData: PropTypes.func
}

const mapStateToProps = ({ body }) => ({
  bodyData: body.value
})

export default connect(
  mapStateToProps,
  {
    fetchBodyData
  }
)(Body)
