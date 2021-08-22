import { DateTime } from 'luxon';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { returnWeatherCall } from './apiCall';
import SearchWeatherDisplay from './components/SearchWeatherDisplay/SearchWeatherDisplay';
import WeatherDisplay from './components/WeatherDisplay/WeatherDisplay';
require('dotenv').config();

const getLastFiveDays = (yesterday) => {
  let currentDay = parseInt(yesterday);
  const daysArray = []
  for(let i = 0; i < 5; i++){
    daysArray.push(currentDay)
    currentDay -= 86400
  }
  return daysArray;
};

function SplitPane(props) {
  return (
    <div className="container">
      <div className="container-left">
        {props.left}
      </div>
      <div className="container-right">
        {props.right}
      </div>
    </div>
  )
}

function App() {
  const yesterday = DateTime.now().toSeconds().toFixed(0) - 86400;
  const [previousDays, setPreviousDays] = useState(getLastFiveDays(yesterday))
  const [latitude, setLatitude] = useState([]);
  const [longitude, setLongitude] = useState([]);
  const [weatherData, setWeatherData] = useState({ 
    currentWeatherData: [], 
    historicalWeatherData: [],
  });
  const [error, setError] = useState(false);
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchWeatherData = async () => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
      });

      const currentData = await axios.get(`${process.env.REACT_APP_URL}/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.REACT_APP_API_KEY}`);
      const historicalData = await Promise.all(previousDays.map(async (day, i) => {
        const res = await axios.get(`${process.env.REACT_APP_URL}/onecall/timemachine?lat=${latitude}&lon=${longitude}&units=metric&dt=${day}&appid=${process.env.REACT_APP_API_KEY}`);
        return res.data
      }))

      setWeatherData({ currentWeatherData: currentData.data, historicalWeatherData: historicalData})
    }
    fetchWeatherData();
  },[latitude, longitude]);


  const handleSubmit = async (e) => {
      e.preventDefault();
      const city = input;
      const newData = await returnWeatherCall(city);
      if(newData.status === 404){
        setError(true)
        return
      }else {
        setError(false)
        setWeatherData({currentWeatherData: newData.currentWeatherData, historicalWeatherData: newData.historicalWeatherData})
      }
     
  };

  //Not the best way to handle clearing state but implemented due to time constraints
  const handleReset = () => {
    window.location.reload()
  };

  const handleChange = (e) => {
    setInput(e)
  };

  return (
    <div className="app">
      <SplitPane
        left={
          <WeatherDisplay
            currentWeatherData={weatherData.currentWeatherData}
            handleReset={handleReset}
          />
        }
        right={
          (
          <SearchWeatherDisplay
            input={input}
            historicalWeatherData={weatherData.historicalWeatherData}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            error={error}
          /> 
          )}
      />
    </div>    
  );
}

export default App;
