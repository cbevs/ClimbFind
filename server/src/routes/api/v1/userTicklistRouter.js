import express from "express"
import { Ticklist } from "../../../models/index.js"
import cleanUserInput from "../../../services/cleanUserInput.js"
import { ValidationError } from "objection"
import TicklistSerializer from "../../../serializers/TicklistSerializer.js"
const userTicklistRouter = new express.Router()

userTicklistRouter.get("/", async (req ,res) => {
  try {
    const ticklists = await Ticklist.query()
    return res.status(200).json({ ticklists: ticklists })
  } catch(error) {
    return res.status(500).json({ errors: error.message })
  }
})

userTicklistRouter.get("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const ticklist = await Ticklist.query().where("userId", id)
    const serializedTicklist = await Promise.all(ticklist.map(async tick => {
      return TicklistSerializer.getTickWithClimbName(tick)
    }))
    return res.status(200).json({ ticklist: serializedTicklist })
  } catch(error) {
    return res.status(500).json({ errors: error.message })
  }
})

userTicklistRouter.post("/", async (req, res) => {
  const cleanedBody = cleanUserInput(req.body)
  cleanedBody.userId = req.user.id
  try {
    const response = await Ticklist.query().insertAndFetch(cleanedBody)
    return res.status(200).json({ ticklist: response })
  } catch(error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error.message })
  }
})

export default userTicklistRouter