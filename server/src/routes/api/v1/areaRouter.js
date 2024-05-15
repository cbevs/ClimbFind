import express from "express"
import { Area } from "../../../models/index.js"
import AreaSerializer from "../../../serializers/AreaSerializer.js"

const areasRouter = new express.Router()

areasRouter.get("/recents", async (req, res) => {
  try{
    const areaData = await Area.query().range(0, 9)
    const serializedAreaData = await Promise.all(areaData.results.map(async area => {
      return await AreaSerializer.getAreaInfo(area)
    }))
    res.status(200).json({ areas: serializedAreaData })
  } catch(error) {
    res.status(500).json({ errors: error })
  }
})

areasRouter.get("/:id", async (req, res) => {
  const areaId = req.params.id
  try{
    const areaData = await Area.query().findById(areaId)
    const serializedAreaData = await AreaSerializer.getAreaInfo(areaData)

    const climbData = await areaData.$relatedQuery("climbs")
    const climbs = climbData.map(climb => {
      return { name: climb.name, id: climb.id, grade: climb.grade, rating: climb.rating }
    })
    
    serializedAreaData.climbs = climbs
    res.status(200).json({ areas: serializedAreaData })
  } catch(error) {
    console.log(error)
    res.status(500).json({ errors: error })
  }
})

export default areasRouter