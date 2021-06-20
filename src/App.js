import React, { useState } from 'react'
import 'dotenv'

//import './App.css';

const api = {
  key: "7c225b120d6cf9634fc6ea8cc1d13710",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState();
  const [weather, setWeather] = useState({});

  const search = evt => {
    if(evt.key === 'Enter'){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(!result.message ? 'Result was found' : 'No result')
          
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") 
    ? ((weather.main.temp > 16 )
    ? "app warm" 
    : 'app') 
    : "app"}>
      <main>
        <div className="search-box">
          <input type="text" 
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
          <div>
            {!weather.message ? (
              <div>
                <div className="location-box">
                  <div className="location">{weather.name}, {weather.sys.country}</div>
                  <div className="date">{dateBuilder(new Date())}</div>
                </div>
                <div className="weather-box">
                  <div className="temp">
                    {Math.round(weather.main.temp)}°c
                  </div>
                  <div className="weather">
                    {weather.weather[0].main}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="location-box">
                  <div className="location">This country could not be found</div>
                  <div className="date">{dateBuilder(new Date())}</div>
                </div>
                <div className="weather-box">
                  <div className="temp">
                  </div>
                  <div className="weather">
                    Invalid country
                  </div>
                </div>
              </div>
            )}
          </div>  
      </main>
    </div>
  );
}

export default App;
