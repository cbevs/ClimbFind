import express from "express"
import { Climb, Ticklist } from "../../../models/index.js"
import ClimbSerializer from "../../../serializers/ClimbSerializer.js"
import uploadImage from "../../../services/uploadImage.js"
import cleanEditedUserInput from "../../../services/cleanEditedUserInput.js"
import { ValidationError } from "objection"
const climbRouter = new express.Router()

climbRouter.get("/recents", async (req, res) => {
  try{
    const climbData = await Climb.query().range(0, 4)
    const serializedClimbData = await Promise.all(climbData.results.map(async climb => {
      return await ClimbSerializer.getClimbInfo(climb)
    }))
    return res.status(200).json({ climbs: serializedClimbData })
  } catch(error) {
    return res.status(500).json({ errors: error.message })
  }
})

climbRouter.get("/:id", async (req, res) => {
  const climbId = req.params.id
  try{
    const climbData = await Climb.query().findById(climbId)
    const serializedClimbData = await ClimbSerializer.getClimbInfo(climbData)
    return res.status(200).json({ climb: serializedClimbData })
  } catch(error) {
    return res.status(500).json({ errors: error.message })
  }
})

climbRouter.post("/search", async (req, res) => {
  const responseBody = req.body
  
  const firstVariable = responseBody.shift()
  try{
    const climbData = await Climb.query().where((builder) => {
      builder.whereILike('features', `%${firstVariable}%`)

      if(responseBody.length !== 0) {
        for(let i = 0; i < responseBody.length; i++){
          builder.andWhereILike('features', `%${responseBody[i]}%`)
        }
      }
  })
    return res.status(200).json({ climbs: climbData })
  } catch(error) {
    return res.status(500).json({ errors: error.message })
  }
})

climbRouter.patch("/:id/edit", uploadImage.single("climbImage"), async (req, res) => {
  const climbId = parseInt(req.params.id)
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
   
    const cleanedInput = cleanEditedUserInput(data)
    cleanedInput.userId = parseInt(req.user.id)
  
    const updatedClimb = await Climb.query().patchAndFetchById(climbId, cleanedInput)
    const serializedClimb = await ClimbSerializer.getClimbInfo(updatedClimb)
    return res.status(200).json({ updatedClimb: serializedClimb })
  } catch(error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error.message })
  }
})

climbRouter.delete("/:id", async (req, res) => {
  const climbId = req.params.id
  try {
    await Ticklist.query().delete().where("climbId", climbId)
    const deletedClimb = await Climb.query().deleteById(climbId)
    return res.status(200).json({ climbDeleted: deletedClimb })
  } catch(error) {
    return res.status(500).json({ errors: error.message })
  }
})


export default climbRouter