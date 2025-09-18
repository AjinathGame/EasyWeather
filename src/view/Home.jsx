import axios from 'axios'
import Navbar from '../components/Navbar'
import React, { useEffect, useState } from 'react'

const formatTime = (timestamp) => {
  if (!timestamp) return "--";
  const date = new Date(timestamp * 1000);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours %= 12;
  hours = hours || 12; // the hour '0' should be '12'
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  return `${hours}:${minutesStr} ${ampm}`;
};

const Home = () => {

  const [data, setData] = useState({});
  const [input, setinput] = useState('')
  const [notfound, setnotfound] = useState(false)

  const loaddata = async (city) => {
    if (!city) return;
    setnotfound(false);
    try {
      const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},in&units=metric&appid=c329b4662e7740c1a3439353f887b2d1`)

      setData(result.data);
      setnotfound(false);
      console.log(result.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setnotfound(true)
      } else {
        console.error("Error fetching weather data:", error);
      }
    }
  }

  useEffect(() => {
    if (notfound) {
      alert('City Not Found');
      setData({});
    }
  }, [notfound]);

  document.title = `EasyWeather - ${input}`

  return (
    <div className='h-screen w-screen bg-[#0d1b2a]'>
      <Navbar />
      <div className=' flex top-0'>
        <div className='h-[70px] w-[90vw]  md:w-[60vw] lg:w-[45vw] xl:w-[35vw] p-[15px] bg-gray-400  flex justify-center lg:justify-evenly m-auto mt-[50px] lg:p-[15px] gap-2 rounded-full items-center px-4'>
          <input type='text' placeholder='Search City...' className='h-[50px]  w-[90vw] md:w-[70vw] lg:w-[60vw] xl:w-[50vw] rounded-full pl-[15px] outline-none bg-white' onChange={(e) => setinput(e.target.value)} />
          <button
            className='bg-yellow-500 h-[40px]  w-[100px] text-white font-bold p-[10px] rounded-full cursor-pointer' onClick={() => loaddata(input)}>Search...
          </button>
        </div>
      </div>
      <div className='h-[60vh] w-[100vw] mt-[60px] m-auto flex justify-evenly items-center'>
        <div className='h-[60vh] w-[55vw] bg-[#1b263b] rounded-2xl flex flex-col'>
          <div className='flex'>
          <div className='m-[30px] h-[180px] w-[330px] bg-[#0d1b2a] rounded-2xl flex justify-between ' >
            <div className='h-[100%] w-[50%] bg-gradient-to-br from-[#2e54ff] to-[#962dff] rounded-l-2xl'>
              <h1 className='sun text-6xl text-center  mt-[30px] '>🌤️</h1>

              <h4 className='text-center m-auto mt-[20px] font-bold text-xl text-white '>
                {data.main ? `${data.main.temp} °C` : "--"}
              </h4>

            </div>
            <div className='h-[100%] w-[50%] rounded-r-2xl'>
              <h3 className='text-center m-auto mt-[20px] text-2xl text-white '>📍{data.name}, IN</h3>
              <h1 className='text-center text-white'>---</h1>
              <h3 className='text-center m-auto mt-[10px] text-xl text-white '>
                Feel like : <br /> {data.main ? `${data.main.feels_like} °C` : "--"}
              </h3>
            </div>

          </div>
          <div className='m-[30px] h-[250px] w-[330px] rounded-2xl flex flex-col gap-[20px] '>
            <div className='h-[8vh] w-[20vw] bg-[#0d1b2a] rounded-2xl flex justify-center items-center shadow-sm shadow-amber-100'>
              <h1 className='text-white text-2xl text-center'>{data.main ? `${data.main.temp} °C` : "--"}</h1>

            </div>
            <div className='h-[8vh] w-[20vw] bg-[#0d1b2a] rounded-2xl flex justify-center items-center shadow-sm shadow-amber-100 '>
              <h1 className='text-white text-2xl text-center'>{data.wind ? `${data.wind.speed} km/h` : "--"}</h1>

            </div>
            <div className='h-[8vh] w-[20vw] bg-[#0d1b2a] rounded-2xl flex justify-center items-center shadow-sm shadow-amber-100'>
              <h1 className='text-white text-2xl text-center'>{data.main ? `${data.main.humidity}%` : "--"}</h1>

            </div>
          </div>
          </div>
          <div className='h-[25vh] w-[100%]  rounded-2xl flex gap-[10px]'>
            <div className='h-[90%] w-[100px] bg-[#0d1b2a] rounded-2xl ml-[10px] flex justify-start items-center flex-col'>
              <h3 className='text-white text-xl font-bold mt-[30px]'>Sun</h3>
              <h1 className='text-4xl mt-[10px]'>☀️</h1>
              <h4 className='text-white text-[1rem] mt-[20px] '>15° -3°</h4>
            </div>
            <div className='h-[90%] w-[100px] bg-[#0d1b2a] rounded-2xl ml-[10px] flex justify-center items-center flex-col'>
              <h3 className='text-white text-xl font-bold mt-[20px]'>Mon</h3>
              <h1 className='text-4xl mt-[10px]'>🌦️</h1>
              <h4 className='text-white text-[1rem] mt-[20px] '>15° -3°</h4>
            </div>
            <div className='h-[90%] w-[100px] bg-[#0d1b2a] rounded-2xl ml-[10px] flex justify-center items-center flex-col'>
              <h3 className='text-white text-xl font-bold mt-[20px]'>Tue</h3>
              <h1 className='text-4xl mt-[10px]'>🌧️</h1>
              <h4 className='text-white text-[1rem] mt-[20px] '>15° -3°</h4>
            </div>
            <div className='h-[90%] w-[100px] bg-[#0d1b2a] rounded-2xl ml-[10px] flex justify-center items-center flex-col'>
              <h3 className='text-white text-xl font-bold mt-[20px]'>Wed</h3>
              <h1 className='text-4xl mt-[10px]'>🌧️</h1>
              <h4 className='text-white text-[1rem] mt-[20px] '>15° -3°</h4>
            </div>
            <div className='h-[90%] w-[100px] bg-[#0d1b2a] rounded-2xl ml-[10px] flex justify-center items-center flex-col'>
              <h3 className='text-white text-xl font-bold mt-[20px]'>Thu</h3>
              <h1 className='text-4xl mt-[10px]'>🌨️</h1>
              <h4 className='text-white text-[1rem] mt-[20px] '>15° -3°</h4>
            </div>
            <div className='h-[90%] w-[100px] bg-[#0d1b2a] rounded-2xl ml-[10px] flex justify-center items-center flex-col'>
              <h3 className='text-white text-xl font-bold mt-[20px]'>Fri</h3>
              <h1 className='text-4xl mt-[10px]'>☀️</h1>
              <h4 className='text-white text-[1rem] mt-[20px] '>15° -3°</h4>
            </div>
            <div className='h-[90%] w-[100px] bg-[#0d1b2a] rounded-2xl ml-[10px] flex justify-center items-center flex-col'>
              <h3 className='text-white text-xl font-bold mt-[20px]'>Sat</h3>
              <h1 className='text-4xl mt-[10px]'>☀️</h1>
              <h4 className='text-white text-[1rem] mt-[20px] '>15° -3°</h4>
            </div>

          </div>
        </div>
        <div className='h-[60vh] w-[35vw] bg-[#1b263b] rounded-2xl'>
          <div className='h-[33%] w-[100%] flex  items-center'>
            <div className='h-[80%] w-[45%] ml-[20px] bg-[#0d1b2a] rounded-2xl flex flex-col '>
              <h3 className='text-gray-400 text-[1.1rem] text-center mt-[10px] font-bold'>Wind Status</h3>
              <h1 className='text-white text-4xl text-center mt-[10px]'>{data.wind ? `${data.wind.speed} ` : "--"}<span className='text-white text-[1rem] '>km/h</span></h1>
              <h3 className='text-white text-2xl text-center mt-[5px]'>WSW</h3>
            </div>
            <div className='h-[80%] w-[45%] ml-[20px] bg-[#0d1b2a] rounded-2xl flex flex-col gap-[10px]'>
              <h3 className='text-gray-400 text-[1.1rem] text-center mt-[10px] font-bold'>Humidity</h3>
              <h1 className='text-white text-4xl text-center mt-[25px]'>{data.main ? `${data.main.humidity} ` : "--"}<span className='text-white text-[1rem] '>%</span></h1>


            </div>
          </div>
          <div className='h-[33%] w-[100%] flex  items-center'>
            <div className='h-[80%] w-[45%] ml-[20px] bg-[#0d1b2a] rounded-2xl flex flex-col '>
              <h3 className='text-gray-400 text-[1.1rem] text-center mt-[10px] font-bold'>Pressure</h3>
              <h1 className='text-white text-4xl text-center mt-[25px]'>{data.main ? `${data.main.pressure} ` : "--"}<span className='text-white text-[1rem] '>hPa</span></h1>


            </div>
            <div className='h-[80%] w-[45%] ml-[20px] bg-[#0d1b2a] rounded-2xl flex flex-col gap-[10px]'>
              <h3 className='text-gray-400 text-[1.1rem] text-center mt-[10px] font-bold'>Visibility</h3>
              <h1 className='text-white text-4xl text-center mt-[15px]'>{data.visibility ? `${(data.visibility / 1000).toFixed(1)} ` : "--"}<span className='text-white text-[1rem] '>km</span></h1>

            </div>
          </div>
          <div className='h-[33%] w-[100%] flex  items-center'>
            <div className='h-[80%] w-[45%] ml-[20px] bg-[#0d1b2a] rounded-2xl flex flex-col '>
              <h3 className='text-gray-400 text-[1.1rem] text-center mt-[10px] font-bold'>Sunrise</h3>
              <h1 className='text-white text-4xl text-center mt-[25px]'>{data.sys ? formatTime(data.sys.sunrise) : "--"}</h1>
            </div>
            <div className='h-[80%] w-[45%] ml-[20px] bg-[#0d1b2a] rounded-2xl flex flex-col gap-[10px]'>
              <h3 className='text-gray-400 text-[1.1rem] text-center mt-[10px] font-bold'>Sunset</h3>
              <h1 className='text-white text-4xl text-center mt-[15px]'>{data.sys ? formatTime(data.sys.sunset) : "--"}</h1>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Home
