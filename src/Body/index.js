import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchBodyData } from './action'

class Body extends Component {
  componentDidMount () {
    this.props.fetchBodyData()
  }
  render () {
    return (
      <React.Fragment>
        <div>{this.props.bodyData}</div>
        <ul>
          <li>
          <Link to='/home'>Home</Link>
          </li>
          <li>
          <Link to='/about'>About</Link>
          </li>
        </ul>
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

export default connect(mapStateToProps, {
  fetchBodyData
})(Body)
