import axios from 'axios'
import Navbar from '../components/Navbar'
import React, { useCallback, useEffect, useState } from 'react'

const formatTime = (timestamp) => {
  if (!timestamp) return "--";
  const date = new Date(timestamp * 1000);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours %= 12;
  hours = hours || 12; 
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  return `${hours}:${minutesStr} ${ampm}`;
};

const getDayOfWeek = (timestamp) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const date = new Date(timestamp * 1000);
  return days[date.getDay()];
};

const getWeatherIcon = (iconCode) => {
  
  switch (iconCode.slice(0, 2)) {
    case '01': return '☀️'; 
    case '02': return '🌤️'; 
    case '03': return '☁️'; 
    case '04': return '☁️'; 
    case '09': return '🌧️'; 
    case '10': return '🌦️'; 
    case '11': return '⛈️'; 
    case '13': return '🌨️'; 
    case '50': return '🌫️'; 
    default: return '🌡️';
  }
};

const Home = () => {

  const [data, setData] = useState({});
  const [forecastData, setForecastData] = useState([]);
  const [input, setinput] = useState('')
  const [notfound, setnotfound] = useState(false)

  const processForecastData = (list) => {
    const dailyData = {};

    list.forEach(item => {
      const day = new Date(item.dt * 1000).toISOString().split('T')[0];
      if (!dailyData[day]) {
        dailyData[day] = {
          temps: [],
          icons: {},
          dt: item.dt,
        };
      }
      dailyData[day].temps.push(item.main.temp);
      const icon = item.weather[0].icon;
      dailyData[day].icons[icon] = (dailyData[day].icons[icon] || 0) + 1;
    });

    return Object.values(dailyData).map(dayData => {
      const mostCommonIcon = Object.keys(dayData.icons).reduce((a, b) => dayData.icons[a] > dayData.icons[b] ? a : b);
      return {
        dt: dayData.dt,
        temp_max: Math.round(Math.max(...dayData.temps)),
        temp_min: Math.round(Math.min(...dayData.temps)),
        icon: mostCommonIcon,
      };
    }).slice(0, 7); // Get up to 7 days
  };

  const loaddata = useCallback(async (city) => {
    if (!city) return;
    setnotfound(false);
    const apiKey = 'c329b4662e7740c1a3439353f887b2d1';
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},in&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city},in&units=metric&appid=${apiKey}`;

    try {
      const [currentWeatherResponse, forecastResponse] = await Promise.all([
        axios.get(currentWeatherUrl),
        axios.get(forecastUrl)
      ]);

      setData(currentWeatherResponse.data);
      setForecastData(processForecastData(forecastResponse.data.list));
      setnotfound(false);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setnotfound(true)
      } else {
        console.error("Error fetching weather data:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (notfound) {
      alert('City Not Found' );
      setData({});
      setForecastData([]);
    }
  }, [notfound]);

  useEffect(() => {
    loaddata('Delhi'); 
  }, [loaddata]);

  document.title = `EasyWeather - ${input}`

  return (
    <div className='h-auto min-h-screen w-screen bg-[#0d1b2a] pb-20'>
      <Navbar />
      <div className=' flex top-0'>
        <div className='h-auto w-[90vw] md:w-[60vw] lg:w-[45vw] xl:w-[35vw] p-2 bg-gray-400 flex  sm:flex-row justify-center m-auto mt-[50px] gap-2 rounded-full items-center px-4'>
          <input type='text' placeholder='Search City...' className='h-[50px] w-full rounded-full pl-[15px] outline-none bg-white' onChange={(e) => setinput(e.target.value)} />
          <button
            className='bg-yellow-500 h-[40px] w-[120px] text-white font-bold p-[10px] rounded-full cursor-pointer' onClick={() => loaddata(input)}>Search
          </button>
        </div>
      </div>
      <div className='h-auto w-[95vw] md:w-[90vw] mt-[60px] m-auto flex flex-col lg:flex-row justify-evenly items-start gap-5'>
        <div className='h-auto w-full lg:w-[55vw] bg-[#1b263b] rounded-2xl flex flex-col p-4'>
          <div className='flex flex-col md:flex-row gap-4'>
            <div className='h-[180px] w-full md:w-[330px] bg-[#0d1b2a] rounded-2xl flex justify-between'>
              <div className='h-full w-1/2 bg-gradient-to-br from-[#2e54ff] to-[#962dff] rounded-l-2xl flex flex-col justify-center items-center'>
                <h1 className='sun text-6xl'>{data.weather ? getWeatherIcon(data.weather[0].icon) : '🌤️'}</h1>

                <h4 className='text-center font-bold text-xl text-white mt-2'>
                  {data.main ? `${data.main.temp} °C` : "--"}
                </h4>

              </div>
              <div className='h-full w-1/2 rounded-r-2xl flex flex-col justify-center items-center'>
                <h3 className='text-center text-2xl text-white px-2 truncate'>📍{data.name || 'City'}, IN</h3>
                <h1 className='text-center text-white'>---</h1>
                <h3 className='text-center text-xl text-white mt-2'>
                  Feels like: <br /> {data.main ? `${data.main.feels_like} °C` : "--"}
                </h3>
              </div>
            </div>
            <div className='w-full md:w-auto flex-grow rounded-2xl flex flex-row md:flex-col gap-4'>
              <div className='h-auto md:h-[8vh] w-full bg-[#0d1b2a] rounded-2xl flex justify-center items-center shadow-sm shadow-amber-100 p-2'>
                <h1 className='text-white text-xl md:text-2xl text-center'>{data.main ? `${data.main.temp} °C` : "--"}</h1>
              </div>
              <div className='h-auto md:h-[8vh] w-full bg-[#0d1b2a] rounded-2xl flex justify-center items-center shadow-sm shadow-amber-100 p-2'>
                <h1 className='text-white text-xl md:text-2xl text-center'>{data.wind ? `${data.wind.speed} km/h` : "--"}</h1>
              </div>
              <div className='h-auto md:h-[8vh] w-full bg-[#0d1b2a] rounded-2xl flex justify-center items-center shadow-sm shadow-amber-100 p-2'>
                <h1 className='text-white text-xl md:text-2xl text-center'>{data.main ? `${data.main.humidity}%` : "--"}</h1>
              </div>
            </div>
          </div>
          <div className='h-auto w-full rounded-2xl flex overflow-x-auto gap-2 mt-4 p-2'>
            {forecastData.length > 0 ? forecastData.map((day, index) => (
              <div key={index} className='h-full min-w-[100px] bg-[#0d1b2a] rounded-2xl flex justify-center items-center flex-col p-2'>
                <h3 className='text-white text-xl font-bold mt-[20px]'>{getDayOfWeek(day.dt)}</h3>
                <h1 className='text-4xl mt-[10px]'>{getWeatherIcon(day.icon)}</h1>
                <h4 className='text-white text-[1rem] mt-[20px] '>{day.temp_max}° {day.temp_min}°</h4>
              </div>
            )) : (
              <p className='text-white w-full text-center'>Loading forecast...</p>
            )}
          </div>
        </div>
        <div className='h-auto w-full lg:w-[35vw] bg-[#1b263b] rounded-2xl p-4 flex flex-col gap-4'>
          <div className='flex-1 w-full flex flex-col sm:flex-row gap-4'>
            <div className='h-full w-full sm:w-1/2 bg-[#0d1b2a] rounded-2xl flex flex-col p-4'>
              <h3 className='text-gray-400 text-[1.1rem] text-center mt-[10px] font-bold'>Wind Status</h3>
              <h1 className='text-white text-4xl text-center mt-[10px]'>{data.wind ? `${data.wind.speed} ` : "--"}<span className='text-white text-[1rem] '>km/h</span></h1>
              <h3 className='text-white text-2xl text-center mt-[5px]'>WSW</h3>
            </div>
            <div className='h-full w-full sm:w-1/2 bg-[#0d1b2a] rounded-2xl flex flex-col p-4'>
              <h3 className='text-gray-400 text-[1.1rem] text-center mt-[10px] font-bold'>Humidity</h3>
              <h1 className='text-white text-4xl text-center mt-[25px]'>{data.main ? `${data.main.humidity} ` : "--"}<span className='text-white text-[1rem]'>%</span></h1>
            </div>
          </div>
          <div className='flex-1 w-full flex flex-col sm:flex-row gap-4'>
            <div className='h-full w-full sm:w-1/2 bg-[#0d1b2a] rounded-2xl flex flex-col p-4'>
              <h3 className='text-gray-400 text-[1.1rem] text-center mt-[10px] font-bold'>Pressure</h3>
              <h1 className='text-white text-4xl text-center mt-[25px]'>{data.main ? `${data.main.pressure} ` : "--"}<span className='text-white text-[1rem] '>hPa</span></h1>
            </div>
            <div className='h-full w-full sm:w-1/2 bg-[#0d1b2a] rounded-2xl flex flex-col p-4'>
              <h3 className='text-gray-400 text-[1.1rem] text-center mt-[10px] font-bold'>Visibility</h3>
              <h1 className='text-white text-4xl text-center mt-[15px]'>{data.visibility ? `${(data.visibility / 1000).toFixed(1)} ` : "--"}<span className='text-white text-[1rem] '>km</span></h1>
            </div>
          </div>
          <div className='flex-1 w-full flex flex-col sm:flex-row gap-4'>
            <div className='h-full w-full sm:w-1/2 bg-[#0d1b2a] rounded-2xl flex flex-col p-4'>
              <h3 className='text-gray-400 text-[1.1rem] text-center mt-[10px] font-bold'>Sunrise</h3>
              <h1 className='text-white text-4xl text-center mt-[25px]'>{data.sys ? formatTime(data.sys.sunrise) : "--"}</h1>
            </div>
            <div className='h-full w-full sm:w-1/2 bg-[#0d1b2a] rounded-2xl flex flex-col p-4'>
              <h3 className='text-gray-400 text-[1.1rem] text-center mt-[10px] font-bold'>Sunset</h3>
              <h1 className='text-white text-4xl text-center mt-[15px]'>{data.sys ? formatTime(data.sys.sunset) : "--"}</h1>
            </div>
          </div>
        </div>
      </div>
      <div className='h-[50vh] md:h-[80vh] w-[95vw] md:w-[90vw] m-auto mt-10 rounded-2xl overflow-hidden'>
        {data.coord ? (
          <iframe className='h-full w-full' title={`${data.name} location map`} src={`https://maps.google.com/maps?q=${data.coord.lat},${data.coord.lon}&output=embed`} ></iframe> ) : (<div className="h-full w-full flex justify-center items-center bg-[#1b263b]"><p className="text-white text-xl">Search for a city to view it on the map</p></div> )}
      </div>

    </div>
  )
}

export default Home
