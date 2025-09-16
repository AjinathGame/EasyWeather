import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <>
      <div className='h-auto pb-[20px] w-screen bg-gray-900 flex justify-between flex-col md:flex-row md:items-center md:justify-between items-start '>
        <h1 className='text-white text-3xl font-bold ml-10 mt-[10px]  '>Sky<span className='text-yellow-500'>Cast</span></h1>
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
