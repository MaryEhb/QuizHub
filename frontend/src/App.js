import React from 'react'
import { LoadingProvider } from './context/LoadingContext'
import { GeneralMsgProvider } from './context/GenralMsgContext';

import Dashboard from './pages/Dashboard'

const App = () => {
  return (
    
      <LoadingProvider>
        <GeneralMsgProvider>
        <div>
          App
        </div>
        </GeneralMsgProvider>
      </LoadingProvider>
   
  )
}

export default App