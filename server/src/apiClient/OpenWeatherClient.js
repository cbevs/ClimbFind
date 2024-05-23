import got from "got";
import dotenv from "dotenv"
dotenv.config();
const openWeatherApiKey = process.env.OPEN_WEATHER_API_KEY

class OpenWeatherClient {   
  static async getWeather(coordinates){
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lon=${coordinates.longitude}&lat=${coordinates.latitude}&appid=${openWeatherApiKey}&units=imperial`
      const apiResponse = await got(url)
      const responseBody = apiResponse.body
      return responseBody
    } catch (error) {
      return { error: error.message}
    }
  }
}

export default OpenWeatherClient;