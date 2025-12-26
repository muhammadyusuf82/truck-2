import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login/Login'
import Navbar from './components/User/Navbar/Navbar'
import Home from './pages/Home/Home'
import Footer from './components/User/Footer/Footer'
function App() {

  return (
    <>
      <Home/>
      {/* <Login/> */}
    </>
  )
}

export default App
