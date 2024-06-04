import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState({
    email: ""
  })
  const [requestResponse, setRequestResponse] = useState("")

  const handleInputChange = (event) => {
    setEmail({
      ...email,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const submitEmail = async (event) => {
    event.preventDefault()
    if (email.email === "") {
      setRequestResponse("Email cannot be blank!")
    } else {
      try {
        const response = await fetch("/api/v1/users/forgot-password", {
          method: "POST",
          headers: new Headers({ "Content-Type": "application/json" }),
          body: JSON.stringify(email),
        })
        if (!response.ok) {
          if (response.status === 422) {
            const responseBody = await response.json()
            setRequestResponse(responseBody.error)
          }
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw error
        }
        const responseBody = await response.json()
        setRequestResponse(responseBody.body)
      } catch (error) {
        console.error(error)
      }
    }
  }

  let responsePane

  if (Object.keys(requestResponse).length > 0) {
    responsePane = (
      <div className="error-callout">
        <ul>
          <li className="errors">{requestResponse}</li>
        </ul>
      </div>
    )
  }

  return (
    <div className="grid-container">
      <h1>Forgot Password?</h1>
      {responsePane}
      <form onSubmit={submitEmail}>
        <label>
          Enter your email address
          <input type="text" name="email" onChange={handleInputChange} />
        </label>
        
        <div>
          <input type="submit" className="button" value="Send Password Reset Email" />
        </div>
      </form>
    </div>
  )
}

export default ForgotPassword