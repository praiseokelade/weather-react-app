import React, { useState } from "react";
import axios from "axios";

export default function Weather() {
  let [city, setCity] = useState("");
  let [weather, setWeather] = useState({});
  let [loaded, setLoaded] = useState(false);

  function updateWeather(response) {
    setLoaded(true);
    setWeather({
      temperature: Math.round(response.data.main.temp),
      description: Math.round(response.data.weather.description),
      humidity: Math.round(response.data.main.humidity),
      wind: Math.round(response.data.wind.speed),
      icon: response.data.weather.icon,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let url = `api.openweathermap.org/data/2.5/weather?q=${city}&APPID=1b901af6aebac22237b46d403f820672&units=metric`;
    axios.get(url).then(updateWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  if (loaded) {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            placeholder="Enter a city..."
            onChange={updateCity}
          />
          <input type="submit" value="Search" />
        </form>
        <ul>
          <li>Temperature: {weather.temperature}</li>
          <li>Description:{weather.description}</li>
          <li>Humidity: {weather.humidity}</li>
          <li>Wind: {weather.wind}</li>
          <li>Icon: {weather.icon}</li>
        </ul>
      </div>
    );
  } else {
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Enter a city..."
          onChange={updateCity}
        />
        <input type="submit" value="Search" />
      </form>
    );
  }
}
