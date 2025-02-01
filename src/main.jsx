import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import 'react-tooltip/dist/react-tooltip.css'
import "react-toastify/dist/ReactToastify.css";

import { GoogleOAuthProvider } from '@react-oauth/google'


createRoot(document.getElementById('root')).render(
  <StrictMode>
     <GoogleOAuthProvider clientId='907635437669-ovgajb3e169h1k11cts3b1q6evfrf52h.apps.googleusercontent.com'>
     <BrowserRouter>
      <App />
    </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>,
)
