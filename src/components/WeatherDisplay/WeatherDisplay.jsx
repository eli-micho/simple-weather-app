import { DateTime } from 'luxon';
import './styles.scss';

const Loader = () => {
  return <span className="loader"></span>
};

export default function WeatherDisplay({currentWeatherData, ...otherProps}) {
  const { name, main, weather, wind, visibility } = currentWeatherData
    return (
        <>
          <div className="title-container">
            <p>{DateTime.now().toLocaleString(DateTime.DATE_MED)}</p>
            <h1>{name ? name : <Loader/>}</h1>
          </div>

          <div className="center-weather-info">
            <h1>{!main ? <Loader/> : main.temp.toFixed(0)}&#176;C</h1>
            <p style={{textTransform: "capitalize"}}>{!weather ? <Loader/> : weather[0].description}</p>
            <ul>
              <li>High. {!main ? <Loader/> : main.temp_max.toFixed(0)}&#176;C</li>
              <li>Feels Like {!main ? <Loader/> : main.feels_like.toFixed(0)}&#176;C</li>
              <li>Low. {!main ? <Loader/> : main.temp_min.toFixed(0)}&#176;C</li>
            </ul>
          </div>

          <div className="bottom-weather-info">
            <ul>
              <li>
                <h5>Pressure</h5>
                <span>{!main ? <Loader/> : main.pressure} MB</span>
              </li>
              <li>
                <h5>Humidity</h5>
                <span>{!main ? <Loader/> : main.humidity} %</span>
              </li>
              <li>
                <h5>Wind</h5>
                <span>{!wind ? <Loader/> : wind.speed} km/h</span>
              </li>
              <li>
                <h5>Visibility</h5>
                <span>{!visibility? <Loader/> : parseInt(visibility)} km</span>
              </li>
            </ul>
          </div>
        </>
    )
}
