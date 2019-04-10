import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import QueryBuilder from '../QueryBuilder'
import { fetchBodyData } from './action'

class Body extends Component {
  render() {
    return (
      <React.Fragment>
        <QueryBuilder />
      </React.Fragment>
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
