import React from 'react'
import { LoadingProvider } from './context/LoadingContext'
import Dashboard from './pages/Dashboard'

const App = () => {
  return (
    <LoadingProvider>
      <div>
        App
      </div>
    </LoadingProvider>
  )
}

export default App