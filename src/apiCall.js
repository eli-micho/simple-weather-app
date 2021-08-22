import {DateTime} from 'luxon';
import axios from 'axios';

const yesterday = DateTime.now().toSeconds().toFixed(0) - 86400;

const getLastFiveDays = (yesterday) => {
    let currentDay = parseInt(yesterday);
    const daysArray = []
    for(let i = 0; i < 5; i++){
      daysArray.push(currentDay)
      currentDay -= 86400
    }
    return daysArray;
};
  

export const returnWeatherCall = async (city) => {
    const previousDays = getLastFiveDays(yesterday)
    let weatherData = { 
        currentWeatherData: [], 
        historicalWeatherData: [],
    };
    try {
        const currentData = await axios.get(`${process.env.REACT_APP_URL}/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
        const latitude = currentData.data.coord.lat;
        const longitude = currentData.data.coord.lon;

        weatherData.currentWeatherData = currentData.data;
        weatherData.historicalWeatherData = await Promise.all(previousDays.map(async (day, i) => {
            const res = await axios.get(`${process.env.REACT_APP_URL}/onecall/timemachine?lat=${latitude}&lon=${longitude}&units=metric&dt=${day}&appid=${process.env.REACT_APP_API_KEY}`);
            return res.data
        }));
    }catch(err){
        return err.response
    }
    return weatherData
}