import express from "express"
import { Location } from "../../../models/index.js"
import LocationSerializer from "../../../serializers/LocationSerializer.js"
import cleanUserInput from "../../../services/cleanUserInput.js"
import { ValidationError } from "objection"
import locationAreaRouter from "./locationAreaRouter.js"

const locationRouter = new express.Router()

locationRouter.use("/:id/add-area", locationAreaRouter)

locationRouter.get("/", async (req, res) => {
  try {
    const locationData = await Location.query()
    const serializedLocationData = locationData.map(location => {
      return LocationSerializer.getLocationInfo(location)
    })
    return res.status(200).json({ locations: serializedLocationData })
  } catch(error) {
    return res.status(500).json({ errors: error })
  }
})

locationRouter.get("/:id", async (req, res) => {
  const locationId = req.params.id
  try {
    const locationData = await Location.query().findById(locationId)
    const serializedLocationData = await LocationSerializer.getLocationInfoWithAreas(locationData)
    return res.status(200).json({ location: serializedLocationData })
  } catch(error) {
    return res.status(500).json({ error: error.message })
  }
})

locationRouter.post("/", async (req, res) => {
  const body = cleanUserInput(req.body)
  body.userId = req.user.id
  try{
    const newLocation = await Location.query().insertAndFetch(body)
    const serializedNewLocation = LocationSerializer.getLocationInfo(newLocation)
    return res.status(201).json({ location: serializedNewLocation })
  } catch(error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error.message })
  }
})

locationRouter.post("/search", async (req, res) => {
  const searchData = req.body
   try {
    const locationResults = await Location.query().whereILike("name", `%${searchData.name}%`)
    const serializedLocationResults = locationResults.map(location => {
      return LocationSerializer.getLocationInfo(location)
    })
    return res.status(200).json({ locations: serializedLocationResults })
   } catch(error) {
    return res.status(500).json({ errors: error.message })
   }
})

export default locationRouter