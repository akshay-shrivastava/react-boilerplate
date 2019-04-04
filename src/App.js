import React, { Component } from 'react'
import Header from './Header'
import Footer from './Footer'
import ErrorBoundary from './ErrorBoundries'
import { default as getRoute } from './routes'

import './App.css'

class App extends Component {
  render() {
    return (
      <div>
        <ErrorBoundary>
          <Header />
        </ErrorBoundary>
          {(() => getRoute())()}
          <Footer />
      </div>
    )
  }
}

export default App;
