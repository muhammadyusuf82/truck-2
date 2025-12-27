import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './User/pages/Login/Login'
import Home from './User/pages/Home/Home'
import Yuk from './Freight/User/Yuk'
function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/freight' element={<Yuk/>}/>
    </Routes>
      {/* <Home/> */}
      {/* <Login/> */}
      {/* <Yuk/> */}
    </>
  )
}

export default App
