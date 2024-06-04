import express from "express";
import { ValidationError } from "objection";
import { User } from "../../../models/index.js";
import uploadImage from "../../../services/uploadImage.js"
import userTicklistRouter from "./userTicklistRouter.js";
import getSecret from "../../../services/getSecret.js"
import sendEmail from "../../../services/sendEmail.js";
import jwt from 'jsonwebtoken'

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

usersRouter.post("/forgot-password", async (req, res) => {
  const { email } = req.body
  try {
    const foundUser = await User.query().findOne({ email })
      if (!foundUser) {
        return res.status(422).json({ error: "User does not exist!"})
      }
    const secret = getSecret(foundUser.cryptedPassword)
    const token = jwt.sign({ email: foundUser.email, id: foundUser.id }, secret, { expiresIn: "15m" })
    const id = foundUser.id
    const link = `https://boulder-buddy-4aa61bf1c10c.herokuapp.com/users/reset-password/${id}/${token}`
    sendEmail(link, foundUser.email)
    return res.status(200).json({ body: "Please check your email for a password reset link." })
  } catch (error) {
    return res.status(500).json({ errors: error.message })
  }
})

usersRouter.get("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params
  try {
    const foundUser = await User.query().findOne({ id })
    if (!foundUser) {
      return res.status(404).json({ body: "User does not exist!"})
    }
    const secret = getSecret(foundUser.cryptedPassword)
    const verify = jwt.verify(token, secret)
    return res.status(200).json({ body: "User verified!"})
  } catch (error) {
    if (error.message = "jwt expired") {
      return res.status(401).json({ body: "Link has expired. Please re-submit forgot password form." })
    }
    return res.status(500).json({ body: error.message })
  }
})

usersRouter.post("/reset-password/:id/:token", async (req,res) => {
  const { id, token } = req.params
  const { password } = req.body
  try {
    const foundUser = await User.query().findOne({ id })
    if (!foundUser) {
      return res.status(404).json({ body: "User does not exist!"})
    }
    const secret = getSecret(foundUser.cryptedPassword)
    const verify = jwt.verify(token, secret)
    await User.query().patch({ password })
    return res.status(200).json({ body: true })
  } catch (error) {
    return res.status(500).json({ error: error.message })
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
