import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './User/pages/Login/Login'
import Home from './User/pages/Home/Home'
import Yuk from './Freight/User/Yuk'
import ProfileSetup from './User/pages/Login/ProfileSetup'
import FreightHome from './Freight/User/Home'
function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/freight/asosiy' element={<FreightHome/>}/>
      <Route path='/freight/yuk' element={<Yuk/>}/>
      <Route path='/profile-setup' element={<ProfileSetup/>}/>
    </Routes>
      {/* <Home/> */}
      {/* <Login/> */}
      {/* <Yuk/> */}
    </>
  )
}

export default App
