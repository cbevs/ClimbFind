import React, { useState } from "react";
import ErrorList from "./layout/ErrorList";
import translateServerErrors from "../services/translateServerErrors";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TicklistForm = ({ changePane, climbId, user }) => {
  
  const [ticklist, setTicklist] = useState({
    notes: "",
    date: ""
  })
  const [errors, setErrors] = useState([])
  const [submitted, setSubmitted] = useState(false)
  
  const submitNewTick = async (event) => {
    event.preventDefault()
    ticklist.date = ticklist.date.replaceAll("/", "-")
    ticklist.climbId = climbId
    try{
      const response = await fetch("/api/v1/users/ticklists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ticklist)
      })
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          return setErrors(newErrors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw error
        }
      } else {
        setSubmitted(true)
      }
    } catch(error) {
      console.error(error)
    }
  }

  const handleInputChange = (event) => {
    setTicklist({
      ...ticklist,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const clearForm = (event) => {
    event.preventDefault()
    setTicklist({
      notes: "",
      date: ""
    })
  }

  const tickSubmitted = <div className="submit-tick">
    <p className="ticklist-p">Climb Submitted!</p>
    <Link to={`/profile/${user.id}`} className="no-format-link">Click here to view your ticklist</Link>
    </div>

  return (
    <>
    <FontAwesomeIcon icon="fa-solid fa-arrow-left" title="Previous Window" className="add-icon" onClick={changePane} />
    <p className="icon-text-p">Take me back!</p>
    <form onSubmit={submitNewTick}>
        <label>
          <p className="form-input-p">Notes:</p>
          <textarea
            name="notes"
            onChange={handleInputChange}
            value={ticklist.notes}
          />
        </label>

        <label>
        <p className="form-input-p">Date Sent:</p>
          <input
            type="date"
            name="date"
            className="new-form-option"
            onChange={handleInputChange}
            value={ticklist.date}
            min="1930-01-01"
            max={new Date().toLocaleDateString('en-ca')}
          />
        </label>
        
        <ErrorList errors={errors} />
        <div className="button-group">
          <button type="button" className="button app-button" onClick={clearForm}>
            Clear
          </button>
          <input className="button app-button" type="submit" value="Submit" />
          { (!submitted) ? null : tickSubmitted}
        </div>
      </form>
    </>
  )
}

export default TicklistForm