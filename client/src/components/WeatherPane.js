import React from "react";

const WeatherPane = ({ weatherData, name }) => {
  const weatherDescription = _.startCase(weatherData.description)
  
  return (
    <div className="weather-block">
      <img src={`${weatherData.icon}`} alt="weather-icon"></img>
      <p>Weather for {name}</p>
      <p>Conditions: {weatherDescription}</p>
      <p>Temperature: {weatherData.temp} °F</p>
      <p>Feels Like: {weatherData.feels_like} °F</p>
      <p>Humidity: {weatherData.humidity}%</p>
      <p>Wind: {weatherData.wind} MPH</p>
      </div>
  )
}

export default WeatherPane