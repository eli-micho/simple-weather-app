import { useEffect, useState } from 'react';
import SearchWeatherDisplay from './components/SearchWeatherDisplay/SearchWeatherDisplay';
import WeatherDisplay from './components/WeatherDisplay/WeatherDisplay';

function App() {
  const [coords, setCoords] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
      setCoords({...coords, 
        lat: position.coords.latitude.toFixed(2),
        long: position.coords.longitude.toFixed(2),
      })
    });
  },[]);

  return (
    <div className="app">
      <div className="wrapper">
        <div className="left-content">
          <WeatherDisplay
          />
        </div>

        <div className="right-content">
          <SearchWeatherDisplay/>
        </div>

      </div>
    </div>
  );
}

export default App;
