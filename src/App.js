import React, { useState, useEffect } from "react";
const api = {
  key: "7bd05d22464bf4071a4ad2f46a3b4048",
  base: "https://api.openweathermap.org/data/2.5/",
};
const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [bool, setBool] = useState(false);
  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };
  const getWeather = async (query) => {
    const data = await fetch(
      `${api.base}weather?q=${query}&units=metric&APPID=${api.key}`
    );
    const results = await data.json();
    setWeather(results);
    // console.log(" after search");
    // console.log(" after search", weather);

    // console.log(" state", weather);
  };

  useEffect(() => {
    getWeather("tunis");
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    getWeather(query);
    setQuery("");
    setBool(true);
  };

  return (
    <div
      className={`app  ${
        weather.main && Math.round(weather.main.temp) > 16 ? "warm" : " "
      }  `}
    >
      <main>
        <div className="search-box">
          <form onSubmit={onSubmit} action="">
            <input
              type="text"
              className="search-bar"
              placeholder="Search..."
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              // onKeyPress={}
            />
          </form>
        </div>
        {weather.main ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°c</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
};

export default App;
