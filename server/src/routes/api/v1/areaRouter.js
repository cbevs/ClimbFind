import express from "express"
import { Area } from "../../../models/index.js"
import AreaSerializer from "../../../serializers/AreaSerializer.js"
import areaClimbRouter from "./areaClimbRouter.js"
import ClimbSerializer from "../../../serializers/ClimbSerializer.js"

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

export default areasRouter