import express from "express"
import cleanUserInput from "../../../services/cleanUserInput.js"
import Climb from "../../../models/Climb.js"
import uploadImage from "../../../services/uploadImage.js"
import { ValidationError } from "objection"
import ClimbSerializer from "../../../serializers/ClimbSerializer.js"

const areaClimbRouter = new express.Router({ mergeParams: true })

areaClimbRouter.post("/", uploadImage.single("climbImage"), async (req, res) => {
  const areaId = req.params.id
  try {
    const { body } = req
    let data
    if (!req.file) {
      data = {
        ...body,
        climbImage: undefined,
      }
    } else {
      data = {
        ...body,
        climbImage: req.file.location,
      }
    }

    const cleanedInput = cleanUserInput(data)
   
    cleanedInput.areaId = areaId
    cleanedInput.userId = req.user.id

    if(!cleanedInput.name) {
      const missingName = [{message: "is a required property", keyword: 'required' }]
      return res.status(422).json({ errors: { name: missingName } })
    }
    
    const existingClimb = await Climb.query().findOne({ areaId: areaId, name: cleanedInput.name })
    if(!existingClimb) {
      const newClimbData = await Climb.query().insertAndFetch(cleanedInput)
      const newClimbForArea = ClimbSerializer.getClimbInfoForArea(newClimbData)
    return res.status(200).json({ climb: newClimbForArea })
    } else {
      const alreadyExists = [{message: "already exists in the database", keyword: 'exists' }]
      return res.status(422).json({ errors: { name: alreadyExists } })
    }
  } catch(error) {
    console.log(error)
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

export default areaClimbRouter