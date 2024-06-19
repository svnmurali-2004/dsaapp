import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { LoginProvider } from './context/LoginContext.jsx'
import { LoaderProvider } from './context/LoaderContext.jsx'
import {BrowserRouter as Router} from 'react-router-dom'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
    <LoginProvider>
      <LoaderProvider>
      <App />
      </LoaderProvider>
    
    </LoginProvider>
    </Router>
  </React.StrictMode>,
)
