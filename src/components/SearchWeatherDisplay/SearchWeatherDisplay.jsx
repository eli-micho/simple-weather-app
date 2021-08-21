import { useState } from 'react';
import { WiDaySunny } from 'react-icons/wi';

export default function SearchWeatherDisplay() {
    const [input, setInput] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
    };

    return (
        <>
            <form className="search-form" onSubmit={handleSubmit}>
                <input 
                    placeholder="Search a location" 
                    id="search-input" 
                    onChange={(e) => setInput(e.target.value)}
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
        </>
    )
}
