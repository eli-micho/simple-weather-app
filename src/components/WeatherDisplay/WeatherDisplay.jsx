import { useState, useEffect } from "react";
import { DateTime } from 'luxon';
import { returnWeatherCall } from './../../apiCall';


export default function WeatherDisplay() {
    const [weatherData, setWeatherData] = useState([]);
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=51.8&lon=-111.15&exclude=hourly,minutely&units=metric&appid=8d54138cdb15a1ca6f4d17c56caf17b3`
    useEffect(() => {
        fetch(url)
        .then(res => res.json())
        .then(data => {
            setWeatherData(data)
        })
    },[]);

    console.log(weatherData)
    return (
        <>
            <div className="title-container">
            <p>{DateTime.now().toLocaleString(DateTime.DATE_MED)}</p>
            <h1>Calgary, Alberta</h1>
          </div>

          <div className="center-weather-info">
            <h1>{!weatherData.current ? "Loading..." : weatherData.current.temp.toFixed(0)}&#176;C</h1>
            <p style={{textTransform: "capitalize"}}>{!weatherData.current ? "Loading...": weatherData.current.weather[0].description}</p>
            <ul>
              <li>High. {!weatherData.daily ? "Loading..." : weatherData.daily[0].temp.max.toFixed(0)}&#176;C</li>
              <li>Feels Like {!weatherData.current ? "Loading..." : weatherData.current.feels_like.toFixed(0)}&#176;C</li>
              <li>Low. {!weatherData.daily ? "Loading..." : weatherData.daily[0].temp.min.toFixed(0)}&#176;C</li>
            </ul>
          </div>

          <div className="bottom-weather-info">
            <ul>
              <li>
                <h5>Pressure</h5>
                <span>{!weatherData.current ? "Loading..." : weatherData.current.pressure} MB</span>
              </li>
              <li>
                <h5>Humidity</h5>
                <span>{!weatherData.current ? "Loading..." : weatherData.current.humidity} %</span>
              </li>
              <li>
                <h5>Wind</h5>
                <span>{!weatherData.current ? "Loading..." : weatherData.current.wind_speed} km/h</span>
              </li>
              <li>
                <h5>UV Index</h5>
                <span>{!weatherData.current ? "Loading..." : weatherData.current.uvi}</span>
              </li>
            </ul>
          </div>
        </>
    )
}
