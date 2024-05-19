import express from "express"

import userSessionsRouter from "./api/v1/userSessionsRouter.js"
import usersRouter from "./api/v1/usersRouter.js"
import clientRouter from "./clientRouter.js"
import climbRouter from "./api/v1/climbRouter.js"
import areasRouter from "./api/v1/areaRouter.js"
import locationRouter from "./api/v1/locationRouter.js"

const rootRouter = new express.Router()

rootRouter.use("/", clientRouter)
rootRouter.use("/api/v1/user-sessions", userSessionsRouter)
rootRouter.use("/api/v1/users", usersRouter)
rootRouter.use("/api/v1/climbs", climbRouter)
rootRouter.use("/api/v1/areas", areasRouter)
rootRouter.use("/api/v1/locations", locationRouter)

export default rootRouter
