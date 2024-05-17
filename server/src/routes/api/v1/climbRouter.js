import express from "express"
import { Climb } from "../../../models/index.js"
import ClimbSerializer from "../../../serializers/ClimbSerializer.js"
const climbRouter = new express.Router()

climbRouter.get("/recents", async (req, res) => {
  try{
    const climbData = await Climb.query().range(0, 4)
    const serializedClimbData = await Promise.all(climbData.results.map(async climb => {
      return await ClimbSerializer.getClimbInfo(climb)
    }))
    return res.status(200).json({ climbs: serializedClimbData })
  } catch(error) {
    return res.status(500).json({ errors: error })
  }
})

climbRouter.get("/:id", async (req, res) => {
  const climbId = req.params.id
  try{
    const climbData = await Climb.query().findById(climbId)
    const serializedClimbData = await ClimbSerializer.getClimbInfo(climbData)
    return res.status(200).json({ climb: serializedClimbData })
  } catch(error) {
    return res.status(500).json({ errors: error })
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
    return res.status(500).json({ errors: error })
  }
})

export default climbRouter