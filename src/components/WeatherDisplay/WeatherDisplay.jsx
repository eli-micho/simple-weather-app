import { useState, useEffect } from "react";
import { DateTime } from 'luxon';


export default function WeatherDisplay({currentWeatherData, ...otherProps}) {
    return (
        <>
            <div className="title-container">
            <p>{DateTime.now().toLocaleString(DateTime.DATE_MED)}</p>
            <h1>Calgary, Alberta</h1>
          </div>

          <div className="center-weather-info">
            <h1>{!currentWeatherData.current ? "Loading..." : currentWeatherData.current.temp.toFixed(0)}&#176;C</h1>
            <p style={{textTransform: "capitalize"}}>{!currentWeatherData.current ? "Loading...": currentWeatherData.current.weather[0].description}</p>
            <ul>
              <li>High. {!currentWeatherData.daily ? "Loading..." : currentWeatherData.daily[0].temp.max.toFixed(0)}&#176;C</li>
              <li>Feels Like {!currentWeatherData.current ? "Loading..." : currentWeatherData.current.feels_like.toFixed(0)}&#176;C</li>
              <li>Low. {!currentWeatherData.daily ? "Loading..." : currentWeatherData.daily[0].temp.min.toFixed(0)}&#176;C</li>
            </ul>
          </div>

          <div className="bottom-weather-info">
            <ul>
              <li>
                <h5>Pressure</h5>
                <span>{!currentWeatherData.current ? "Loading..." : currentWeatherData.current.pressure} MB</span>
              </li>
              <li>
                <h5>Humidity</h5>
                <span>{!currentWeatherData.current ? "Loading..." : currentWeatherData.current.humidity} %</span>
              </li>
              <li>
                <h5>Wind</h5>
                <span>{!currentWeatherData.current ? "Loading..." : currentWeatherData.current.wind_speed} km/h</span>
              </li>
              <li>
                <h5>UV Index</h5>
                <span>{!currentWeatherData.current ? "Loading..." : currentWeatherData.current.uvi}</span>
              </li>
            </ul>
          </div>
        </>
    )
}
