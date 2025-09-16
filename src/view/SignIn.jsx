import React from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

const SignIn = () => {
  return (
    <div>
        <Navbar />
      <div className='flex justify-center items-center h-[100vh] bg-[#0d1b2a]'>
        <div className='flex flex-col h-[60vh] w-[80vw] bg-[#1b263b] border-x-sky-400 border-y-sky-700 justify-center items-center border-2 text-white border-gray-300 p-10 rounded-lg shadow-lg sm:w-[60vw] md:w-[40vw] lg:w-[30vw] xl:w-[25vw] 2xl:w-[20vw]'>
          <h1 className='text-3xl font-bold mb-6'>Sign In</h1>
          <input type="text" placeholder='Username' className='border-2 w-[100%] text-white border-gray-300 p-2 mb-4 rounded-lg ' />
          <input type='number' placeholder='Phone Number' className='border-2 w-[100%] text-white border-gray-300 p-2 mb-4 rounded-lg ' />
          <input type="email" placeholder='Email' className='border-2 w-[100%] text-white border-gray-300 p-2 mb-4 rounded-lg ' />
          <input type="password" placeholder='Password' className='border-2 w-[100%] text-white border-gray-300 p-2 mb-6 rounded-lg ' />
          <Link to='/Login'>
          <a className='text-blue-500 hover:underline cursor-pointer mt-[-10px] flex'>Login</a>
          </Link>
          <button className='bg-blue-500 text-white px-4 py-2 rounded-lg  w-[100%] mt-[30px] cursor-pointer hover:bg-blue-600 transition duration-300'>Sign In</button>
        </div>
      </div>
    </div>
  )
}

export default SignIn
