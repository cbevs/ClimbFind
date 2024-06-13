import express from "express"
import { Area } from "../../../models/index.js"
import cleanUserInput from "../../../services/cleanUserInput.js"
import AreaSerializer from "../../../serializers/AreaSerializer.js"
import { ValidationError } from "objection"

const locationAreaRouter = new express.Router({ mergeParams: true })

locationAreaRouter.post("/", async (req,res) => {
  const body = cleanUserInput(req.body)
  const locationId = parseInt(req.params.id)

  try {
    if(!body.name) {
      const missingName = [{message: "is a required property", keyword: 'required' }]
      return res.status(422).json({ errors: { Name: missingName } })
    }

    const existingArea = await Area.query().findOne({ name: body.name, locationId: locationId })
    
    if(!existingArea) {
      body.locationId = locationId
      body.userId = req.user.id
      const newArea = await Area.query().insertAndFetch(body)
      const serializedArea = await AreaSerializer.getBasicAreaInfo(newArea)
      return res.status(200).json({ area: serializedArea })
    } else {
      const alreadyExists = [{message: "already exists in the database", keyword: 'exists' }]
      return res.status(422).json({ errors: { name: alreadyExists } })
    }
  } catch(error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error.message })
  }
})

export default locationAreaRouter