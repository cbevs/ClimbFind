import config from "../config.js";
import nodemailer from "nodemailer"

const sendEmail = async (link, email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: config.gmail.acct,
      pass: config.gmail.key
    }
  })

  const info = await transporter.sendMail({
    from: '"Boulder Buddy Admin" <boulderbuddymailer@gmail.com',
    to: email,
    subject: "Boulder Buddy Password Reset",
    html: `<a href=${link}>Click here to reset your password.</a>`
  })
}

export default sendEmail