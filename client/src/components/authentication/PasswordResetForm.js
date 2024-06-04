import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Redirect } from "react-router-dom"

const PasswordResetForm = ({ id, token }) => {
  const [password, setNewPassword] = useState({
    password: "",
    confirmPassword: "",
  })

  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [message, setMessage] = useState("")

  const [showPassword, setShowPassword] = useState(false)
  const [textType, setTextType] = useState("password")
  let passwordEyeIcon
  let errorMessage

  const revealPassword = () => {
    setShowPassword(!showPassword)
    if (textType === "password") {
      setTextType("text")
    } else {
      setTextType("password")
    }
  }

  if (!showPassword) {
    passwordEyeIcon = (
      <FontAwesomeIcon icon="fa-solid fa-eye" className="password-icon" onClick={revealPassword} />
    )
  } else {
    passwordEyeIcon = (
      <FontAwesomeIcon
        icon="fa-solid fa-eye-slash"
        className="password-icon"
        onClick={revealPassword}
      />
    )
  }

  if (message) {
    errorMessage = (
      <div className="error-callout password-no-match">
        {message}
      </div>
    )
  }

  if (shouldRedirect) {
    return <Redirect push to="/user-sessions/new" />
  }

  const handleInputChange = (event) => {
    setNewPassword({
      ...password,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const submitNewPassword = async () => {
    event.preventDefault()
    if (password.password !== password.confirmPassword) {
      setMessage("Passwords do not match!")
    } else if (password.password.length === 0) {
      setMessage("Please enter a password.")
    } else {
      try {
        const response = await fetch(`/api/v1/users/reset-password/${id}/${token}`, {
          method: "POST",
          headers: new Headers({ "Content-Type": "application/json" }),
          body: JSON.stringify(password)
        })
        if (!response.ok) {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw error
        }
        setMessage("Password updated successfully. You will now be redirected to log in.")
        setTimeout(() => {
          setShouldRedirect(true)
        }, "3000")
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <div className="grid-container">
      {errorMessage}
      <form onSubmit={submitNewPassword}>
        <label>
          New Password:
          <div className="relative">
            <input
              type={textType}
              name="password"
              onChange={handleInputChange}
              value={password.password}
              autoComplete="new-password"
            />
            {passwordEyeIcon}
          </div>
        </label>

        <label>
          Confirm Password:
          <div className="relative">
            <input
              type={textType}
              name="confirmPassword"
              onChange={handleInputChange}
              value={password.confirmPassword}
              autoComplete="new-password"
            />
            {passwordEyeIcon}
          </div>
        </label>

        <div>
          <input type="submit" className="button" value="Update Password" />
        </div>
      </form>
    </div>
  )
}

export default PasswordResetForm
