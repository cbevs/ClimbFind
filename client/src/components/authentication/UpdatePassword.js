import React, { useEffect, useState } from "react";
import PasswordResetForm from "./PasswordResetForm";

const UpdatePassword = (props) => {
  const [noUser, setNoUser] = useState({})
  const [showUpdate, setShowUpdate] = useState(false)
  let errors
  let passwordForm

  const id = props.match.params.id
  const token = props.match.params.token

  const verifyUser = async () => {
    try {
      const response = await fetch(`/api/v1/users/reset-password/${id}/${token}`)
      const responseBody = await response.json()
      if (!response.ok) {
        if (response.status === 404) {
          setNoUser({ error: "Invalid Link" })
        }
        if (response.status === 401) {
          setNoUser({ error: responseBody.body })
        }
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      setShowUpdate(true)
    } catch (error) {
      console.error(error)
    }
  }

  if (Object.keys(noUser).length > 0) {
    errors = (
      <div className="reset-password-errors">
        <p>{noUser.error}</p>
      </div>
    )
  }

  if (showUpdate) {
    passwordForm = <PasswordResetForm id={id} token={token} />
  }

  useEffect(() => {
    verifyUser()
  }, [])

  return (
    <>
    {errors}
    {passwordForm}
    </>
  )
}

export default UpdatePassword