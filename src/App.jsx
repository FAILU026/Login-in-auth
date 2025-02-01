import { useState } from 'react'
import './App.css'
import SignIn from './components/SignIn'
import Dummy from './components/Dummy'
import SSO from './components/SSO'
import Forget from './components/Forget'
import CreateAccount from './components/CreateAccount'
import { Route, Routes } from 'react-router-dom'
import logo from './assets/xebo-logo.svg'


function App() {
  return (
    <>

  <Routes>
      <Route path="/" element={ <SignIn/> } />
      <Route path="/create-account" element={<CreateAccount/>} />
      <Route path="/sso" element={<SSO/>} />
      <Route path="/forgot" element={ <Forget/>} />
    </Routes>

    </>
  )
}

export default App
