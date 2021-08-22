import {DateTime} from 'luxon';
import axios from 'axios';

const today = DateTime.now().toSeconds().toFixed(0);

const getLastFiveDays = (today) => {
    let currentDay = parseInt(today);
    const daysArray = []
    for(let i = 0; i < 5; i++){
      daysArray.push(currentDay)
      currentDay -= 86400
    }
    return daysArray;
};
  

export const returnWeatherCall = async (city) => {
    const previousDays = getLastFiveDays(today)
    let weatherData = { 
        currentWeatherData: [], 
        historicalWeatherData: []
    };

    const currentData = await axios.get(`${process.env.REACT_APP_URL}/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
    const latitude = currentData.data.coord.lat;
    const longitude = currentData.data.coord.lon;

    weatherData.currentWeatherData = currentData.data;
    weatherData.historicalWeatherData = await Promise.all(previousDays.map(async (day, i) => {
        const res = await axios.get(`${process.env.REACT_APP_URL}/onecall/timemachine?lat=${latitude}&lon=${longitude}&units=metric&dt=${day}&appid=${process.env.REACT_APP_API_KEY}`);
        return res.data
    }));

    return weatherData
}