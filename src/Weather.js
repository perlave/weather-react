import React, { useState } from "react";
import axios from "axios";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";

import "./App.css";

export default function Weather(props) {
  const [city, setCity] = useState(props.defaultCity);
  const [weatherData, setWeatherData] = useState({ ready: false });

  function handleResponse(response) {
    setWeatherData({
      ready: true,
      city: response.data.name,
      temperature: response.data.main.temp,
      date: new Date(response.data.dt * 1000),
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: response.data.weather[0].icon,
      description: response.data.weather[0].description,
      coordinates: response.data.coord,
    });
  }

  function search() {
    let apiKey = "b95f179627c8dd37f41e1be6e3250e19";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  if (weatherData.ready) {
    return (
      <div className="Weather">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-9">
              <input
                type="search"
                placeholder="Enter a city.."
                className="form-control"
                onChange={handleCityChange}
              />
            </div>
            <div className="col-3">
              <input type="submit" value="search" className="btn btn-primary" />
            </div>
            <WeatherInfo data={weatherData} />
          </div>
          <WeatherForecast coordinates={weatherData.coordinates} />
        </form>
      </div>
    );
  } else {
    search();
    return "loading..";
  }
}
