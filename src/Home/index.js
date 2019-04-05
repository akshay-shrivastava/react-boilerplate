import React, { Component } from 'react'
import './index.scss'
import { Link } from 'react-router-dom'

export default class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <div>This is a home page.</div>
        <Link to="/about"> Go to About Page </Link>
        <Link to="/"> Go to Main Page </Link>
      </React.Fragment>
    )
  }
}
