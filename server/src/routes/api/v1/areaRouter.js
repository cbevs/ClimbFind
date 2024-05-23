import express from "express"
import { Area } from "../../../models/index.js"
import AreaSerializer from "../../../serializers/AreaSerializer.js"
import areaClimbRouter from "./areaClimbRouter.js"
import ClimbSerializer from "../../../serializers/ClimbSerializer.js"
import OpenWeatherClient from "../../../apiClient/OpenWeatherClient.js"
import WeatherSerializer from "../../../serializers/WeatherSerializer.js"

const areasRouter = new express.Router()

areasRouter.use("/:id", areaClimbRouter)

areasRouter.get("/recents", async (req, res) => {
  try{
    const areaData = await Area.query().range(0, 9)
    const serializedAreaData = await Promise.all(areaData.results.map(async area => {
      return await AreaSerializer.getAreaInfo(area)
    }))
    return res.status(200).json({ areas: serializedAreaData })
  } catch(error) {
    return res.status(500).json({ errors: error.message })
  }
})

areasRouter.get("/:id", async (req, res) => {
  const areaId = req.params.id
  try{
    const areaData = await Area.query().findById(areaId)
    const serializedAreaData = await AreaSerializer.getAreaInfo(areaData)

    if (serializedAreaData.latitude && serializedAreaData.longitude) {
      const weatherResponse = await OpenWeatherClient.getWeather({ latitude: serializedAreaData.latitude, longitude: serializedAreaData.longitude})
      const weatherData = JSON.parse(weatherResponse)
      const serializedWeatherData = WeatherSerializer.getWeatherInfo(weatherData)
      serializedAreaData.weather = serializedWeatherData
      const climbData = await areaData.$relatedQuery("climbs")
      const climbs = climbData.map(climb => {
        return ClimbSerializer.getClimbInfoForArea(climb) 
      })

      serializedAreaData.climbs = climbs
      return res.status(200).json({ areas: serializedAreaData })
    }

    const climbData = await areaData.$relatedQuery("climbs")
    const climbs = climbData.map(climb => {
      return ClimbSerializer.getClimbInfoForArea(climb) 
    })
    
    serializedAreaData.climbs = climbs
    return res.status(200).json({ areas: serializedAreaData })
  } catch(error) {
    return res.status(500).json({ errors: error.message })
  }
})

areasRouter.patch("/:id/coordinates", async (req, res) => {
  const areaId = req.params.id
  try {
    const updatedArea = await Area.query().patchAndFetchById(areaId, req.body)
    const serializedArea = await AreaSerializer.getAreaInfo(updatedArea)

    const weatherResponse = await OpenWeatherClient.getWeather({ latitude: serializedArea.latitude, longitude: serializedArea.longitude})
      const weatherData = JSON.parse(weatherResponse)
      const serializedWeatherData = WeatherSerializer.getWeatherInfo(weatherData)
      serializedArea.weather = serializedWeatherData
      const climbData = await updatedArea.$relatedQuery("climbs")
      const climbs = climbData.map(climb => {
        return ClimbSerializer.getClimbInfoForArea(climb) 
      })

      serializedArea.climbs = climbs
      return res.status(200).json({ areas: serializedArea })
  } catch(error) {
    return res.status(500).json({})
  }
})

export default areasRouter