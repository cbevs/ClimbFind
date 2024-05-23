class WeatherSerializer {

  static getWeatherInfo(weatherData) {
    const weatherIconStringArray = ["https://openweathermap.org/img/wn/", "", "@2x.png"]
    weatherIconStringArray[1] = weatherData.weather[0].icon
    const weatherIcon = weatherIconStringArray.join("")
    const serializedWeather = {
      description: weatherData.weather[0].description,
      icon: weatherIcon,
      temp:weatherData.main.temp,
      feels_like: weatherData.main.feels_like,
      humidity: weatherData.main.humidity,
      wind: weatherData.wind.speed,
    }

    return serializedWeather
  }
}

export default WeatherSerializer