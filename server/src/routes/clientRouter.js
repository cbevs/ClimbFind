import express from "express";

import getClientIndexPath from "../config/getClientIndexPath.js";

const router = new express.Router();

const clientRoutes = ["/", "/user-sessions/new", "/users/new", "/climbs", "/climbs/:id", "/areas", "/areas/:id" ,"/locations", "/locations/:id", "/profile/:id", "/features", "/features/crimp", "/features/sloper", "/features/jug", "/features/pinch", "/features/pocket", "/features/undercling", "/features/side-pull", "/features/gaston", "/features/heel-hook", "/features/toe-hook", "/features/mantle", "/features/slab", "/features/overhang", "/features/dyno", "/users/forgot-password", "/users/reset-password/:id/:token"];

const authedClientRoutes = ["/profile"];

router.get(clientRoutes, (req, res) => {
  res.sendFile(getClientIndexPath());
});

router.get(authedClientRoutes, (req, res) => {
  if (req.user) {
    res.sendFile(getClientIndexPath());
  } else {
    res.redirect("/user-sessions/new");
  }
});

export default router;
