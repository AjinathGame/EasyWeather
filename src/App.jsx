import React from 'react'
import Home from '../src/view/Home'
import Login from './view/Login';
import SignIn from './view/SignIn';
import { BrowserRouter, Routes, Route } from "react-router-dom";



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        
        <Route path='/Login' element={<Login />} />
        <Route path='/SignIn' element={<SignIn />} />
        <Route path='*' element={<h1 className=' flex m-auto mt-[350px] text-6xl font-bold justify-center items-center'>404 Page Not Found</h1>} />
      </Routes>
   
  </BrowserRouter>
  )
}

export default App
