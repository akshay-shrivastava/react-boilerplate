import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Body from './Body'
import HomePage from './Home'
import AboutPage from './About'

const getRoute = () => {
  return (
    <Switch>
      <Route path='/' exact component={Body} />
      <Route path='/home' component={HomePage} />
      <Route path='/about' component={AboutPage} />
    </Switch>
  )
}

export default getRoute
