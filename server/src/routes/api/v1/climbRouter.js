import express from "express"
import { Climb }from "../../../models/index.js"
import ClimbSerializer from "../../../serializers/ClimbSerializer.js"
const climbRouter = new express.Router()

climbRouter.get("/recents", async (req, res) => {
  try{
    const climbData = await Climb.query().range(0, 4)
    console.log(climbData)
    const serializedClimbData = await Promise.all(climbData.results.map(async climb => {
      return await ClimbSerializer.getClimbInfo(climb)
    }))
    res.status(200).json({ climbs: serializedClimbData })
  } catch(error) {
    console.log(error)
    res.status(500).json({ errors: error })
  }
})

climbRouter.get("/:id", async (req, res) => {
  const climbId = req.params.id
  try{
    const climbData = await Climb.query().findById(climbId)
    const serializedClimbData = await ClimbSerializer.getClimbInfo(climbData)
    res.status(200).json({ climb: serializedClimbData })
  } catch(error) {
    res.status(500).json({ errors: error })
  }
})

export default climbRouter