import { useEffect } from 'react';
import { DateTime } from 'luxon';
import { WiDaySunny } from 'react-icons/wi';

function App() {

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  },[])

  return (
    <div className="app">
      <div className="wrapper">
        <div className="left-content">
          <div className="title-container">
            <p>{DateTime.now().toLocaleString(DateTime.DATE_MED)}</p>
            <h1>Calgary, Alberta</h1>
          </div>

          <div className="center-weather-info">
            <h1>28&#176;C</h1>
            <p>Partially Sunny</p>
            <ul>
              <li>High. 30&#176;C</li>
              <li>Feels Like 25&#176;C</li>
              <li>Low. 18&#176;C</li>
            </ul>
          </div>

          <div className="bottom-weather-info">
            <ul>
              <li>
                <h5>Pressure</h5>
                <span>1023 kPa</span>
              </li>
              <li>
                <h5>Humidity</h5>
                <span>86%</span>
              </li>
              <li>
                <h5>Wind</h5>
                <span>1.5km/h</span>
              </li>
              <li>
                <h5>UV Index</h5>
                <span>0.98</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="right-content">
            <form className="search-form">
              <input placeholder="Search a location" id="search-input" />
              <input type="submit" value="Search" id="submit-btn"/>
            </form>

            <h1>Weather.IO</h1>

            <div className="previous-weather-container">
              <p>Past 5 Days</p>
              <hr/>
              <ul>
                <li>
                  <div className="previous-day-weather">
                    <span>Friday</span>
                    <span>25&#176;C/12&#176;C</span>
                    <WiDaySunny/>
                  </div>
                </li>
                <li>
                  <div className="previous-day-weather">
                    <span>Friday</span>
                    <span>25&#176;C/12&#176;C</span>
                    <WiDaySunny/>
                  </div>
                </li>
                <li>
                  <div className="previous-day-weather">
                    <span>Friday</span>
                    <span>25&#176;C/12&#176;C</span>
                    <WiDaySunny/>
                  </div>
                </li>
                <li>
                  <div className="previous-day-weather">
                    <span>Friday</span>
                    <span>25&#176;C/12&#176;C</span>
                    <WiDaySunny/>
                  </div>
                </li>
                <li>
                  <div className="previous-day-weather">
                    <span>Friday</span>
                    <span>25&#176;C/12&#176;C</span>
                    <WiDaySunny/>
                  </div>
                </li>
              </ul>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
