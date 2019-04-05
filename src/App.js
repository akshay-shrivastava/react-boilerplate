import React, { Component } from 'react'
import Header from './Header'
import Footer from './Footer'
import ErrorBoundary from './ErrorBoundries'
import { default as getRoute } from './routes'

import './App.scss'

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <ErrorBoundary>{(() => getRoute())()}</ErrorBoundary>
        <Footer />
      </div>
    )
  }
}

export default App
