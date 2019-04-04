import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './index.css'

export default class About extends Component {
  render () {
    return (
      <React.Fragment>
        <div>This is a About page.</div>
        <Link to='/home'> Go to Home Page </Link>
        <Link to='/'> Go to Main Page </Link>
      </React.Fragment>
    )
  }
}
