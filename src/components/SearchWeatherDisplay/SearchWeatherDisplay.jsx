import { WiDaySunny } from 'react-icons/wi';
import { DateTime } from 'luxon';
import './styles.scss';

const Loader = () => {
  return <span className="loader"></span>
};

const DayWeatherData = ({day}) => {
  return(
    <li >
      <div className="previous-day-weather">
        <div className="date-container">
          <span>{DateTime.fromSeconds(day.current.dt).toLocaleString({day: 'numeric'})}</span>
          <span>{DateTime.fromSeconds(day.current.dt).toLocaleString({weekday: 'long'})}</span>
        </div>
        <span>{day.current.temp.toFixed(0)}&#176;C</span>
        <WiDaySunny/>
      </div>
    </li>
  )
}
export default function SearchWeatherDisplay({ input, handleSubmit, handleChange, historicalWeatherData, ...otherProps }) {
  return (
      <>
          <form className="search-form" onSubmit={handleSubmit}>
              <input 
                  placeholder="Search a location" 
                  id="search-input" 
                  onChange={(e) => handleChange(e.target.value)}
              />
              <input 
                  type="submit" 
                  value="Search" 
                  id="submit-btn"
              />
          </form>

          <h1>Weather.IO</h1>

          <div className="previous-weather-container">
            <p>Past 5 Days</p>
            <hr/>
            <ul>
              {historicalWeatherData != undefined ? 
              historicalWeatherData
              .sort((a,b) => a.index - b.index)
              .map((day, i) => {
                return <DayWeatherData index={i} key={i} day={day}/>
              })
              :  <Loader/>
              }
            </ul>
          </div>
      </>
  )
};