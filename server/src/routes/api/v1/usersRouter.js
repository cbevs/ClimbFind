import express from "express";
import { ValidationError } from "objection";

import { User } from "../../../models/index.js";
import uploadImage from "../../../services/uploadImage.js"

const usersRouter = new express.Router();

usersRouter.post("/", uploadImage.single("profileImage"), async (req, res) => {
  try {
    const { body } = req
    let data
    if (!req.file) {
      data = {
        ...body,
        profileImage: undefined
      }
    } else {
      data = {
        ...body,
        profileImage: req.file.location
      }
    }
    const persistedUser = await User.query().insertAndFetch(data);
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser });
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ error: error.message });
  }
});

export default usersRouter;
