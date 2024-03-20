import React from "react";
import WeatherIcon from "./WeatherIcon";

export default function WeatherForecastDay(props) {
  function maxTemperature() {
    let maxTemp = Math.round(props.data.temp.max);
    return `${maxTemp}°`;
  }
  function minTemperature() {
    let minTemp = Math.round(props.data.temp.min);
    return `${minTemp}°`;
  }

  function day() {
    let days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
    let date = new Date(props.data.dt * 1000);
    let day = date.getDay();

    return days[day];
  }

  return (
    <div>
      <div className="WeatherForecast-day">{day()}</div>
      <WeatherIcon code={props.data.weather[0].icon} size={36} />
      <div className="WeatherForecast-temperatures">
        <span className="WeatherForecast-max-temp">{maxTemperature()}</span>
        <span className="WeatherForecast-min-temp">{minTemperature()}</span>
      </div>
    </div>
  );
}
