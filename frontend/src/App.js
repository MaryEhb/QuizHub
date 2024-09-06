import React from 'react'
import { LoadingProvider } from './context/LoadingContext'
import { GeneralMsgProvider } from './context/GenralMsgContext';
import { AuthProvider } from './context/AuthContext';

import Dashboard from './pages/Dashboard'

const App = () => {
  return (
    <AuthProvider>
      <LoadingProvider>
        <GeneralMsgProvider>
        <div>
          App
        </div>
        </GeneralMsgProvider>
      </LoadingProvider>
    </AuthProvider>
  )
}

export default App