import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/favicon.png'


const Navbar = () => {
  return (
    <>
      <div className='h-auto w-screen bg-gray-900 flex flex-col sm:flex-row items-center justify-between p-4 gap-4'>
        
        <div className="flex items-center justify-center">
          <img src={Logo} alt="EasyWeather Logo" className='h-12 w-12 sm:h-14 sm:w-14' />
          <h1 className='text-white text-2xl sm:text-3xl font-bold ml-3 text-shadow-2xs text-shadow-amber-100'>Easy<span className='text-yellow-500'>Weather</span></h1>
        </div>
        
       
        <div className='flex gap-6 sm:gap-8 md:gap-12 items-center'>
          <Link to='/'>
          <span className='text-white text-xl font-bold cursor-pointer'>Home</span></Link>
          <Link to='/login'>
          <span className='text-white text-xl font-bold cursor-pointer'>Login</span></Link>
          <Link to='/signin'>
          <span className='text-white text-xl font-bold cursor-pointer mr-[10px]'>Signup</span></Link>
        </div>
      </div>
    </>
  )
}

export default Navbar
