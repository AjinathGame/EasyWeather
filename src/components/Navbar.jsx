import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/favicon.png'


const Navbar = () => {
  return (
    <>
      <div className='h-auto pb-[20px] w-screen bg-gray-900 flex justify-between flex-col md:flex-row md:items-center md:justify-between items-start '>
        <img src={Logo} className='h-[70px] w-[70px] pt-[15px] ml-[20px]'></img>
        <h1 className='text-white text-3xl font-bold ml-[30px] mt-[10px]  '>Easy<span className='text-yellow-500'>Weather</span></h1>
        <div className='flex mr-[70px] gap-[50px] w-screen justify-center items-center mt-[15px] md:justify-end'>
          <Link to='/'>
          <span className='text-white text-xl font-bold cursor-pointer'>Home</span></Link>
          <Link to='/login'>
          <span className='text-white text-xl font-bold cursor-pointer'>Login</span></Link>
          <Link to='/signin'>
          <span className='text-white text-xl font-bold cursor-pointer'>Signup</span></Link>
        </div>
        

      </div>
    </>
  )
}

export default Navbar
