import express from "express";
import { ValidationError } from "objection";
import { User } from "../../../models/index.js";
import uploadImage from "../../../services/uploadImage.js"
import userTicklistRouter from "./userTicklistRouter.js";

const usersRouter = new express.Router();

usersRouter.use("/ticklists", userTicklistRouter)

usersRouter.get("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const userData = await User.query().findById(id)
    return res.status(200).json({ userData })
  } catch(error) {
    return res.status(500).json({ errors: error.message })
  }
})

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
    console.log(error)
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ error: error.message });
  }
});

usersRouter.patch("/profile-image", uploadImage.single("profileImage"), async (req, res) => {
  const userId = req.user.id
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
    const updatedUser = await User.query().patchAndFetchById(userId, data)
    return res.status(201).json({ user: updatedUser })
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default usersRouter;
