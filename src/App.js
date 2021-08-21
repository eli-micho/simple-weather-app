import { useEffect, useState } from 'react';
import SearchWeatherDisplay from './components/SearchWeatherDisplay/SearchWeatherDisplay';
import WeatherDisplay from './components/WeatherDisplay/WeatherDisplay';

const previous_days_unix = [
  {
    id: 0,
    time: 1629521405
  },
  {
    id: 1,
    time: 1629435005
  },
  {
    id: 2,
    time: 1629348605
  },
  {
    id: 3,
    time: 1629262205
  },
  {
    id: 4,
    time: 1629175805
  },
];

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
  const [coords, setCoords] = useState({});
  const [currentWeatherData, setCurrentWeatherData] = useState([]);
  const [previousDayData, setPreviousDayData] = useState([])
  const [historicalWeatherData, setHistoricalWeatherData] = useState([]);
  const [input, setInput] = useState("");

  const currentUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=51.8&lon=-111.15&exclude=hourly,minutely&units=metric&appid=8d54138cdb15a1ca6f4d17c56caf17b3`

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
      setCoords({...coords, 
        lat: position.coords.latitude.toFixed(2),
        long: position.coords.longitude.toFixed(2),
      })
    });
  },[]);

  useEffect(() => {
      fetch(currentUrl)
      .then(res => res.json())
      .then(data => {
          setCurrentWeatherData(data)
      })
  },[]);

  useEffect(() => {
    const fetchHistoricalData = (historicalUrl) => {
      fetch(historicalUrl)
      .then(res => res.json())
      .then(data => {
        setHistoricalWeatherData(state => [...state, data])
      })
    };

    previous_days_unix.forEach((day) => {
      const historicalUrl = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=51.8&lon=-111.15&units=metric&dt=${day.time}&appid=8d54138cdb15a1ca6f4d17c56caf17b3`
      fetchHistoricalData(historicalUrl)
    })
  }, [])

  const handleSubmit = (e) => {
      e.preventDefault()
  };

  const handleChange = (e) => {
    setInput(e => e.target.value)
  }
  console.log(historicalWeatherData)
  return (
    <div className="app">
      <SplitPane
        left={
          <WeatherDisplay
            currentWeatherData={currentWeatherData}
          />
        }
        right={
          <SearchWeatherDisplay
            input={input}
            historicalWeatherData={historicalWeatherData}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
          />
        }
      />
    </div>    
  );
}

export default App;
