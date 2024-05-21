import React, { useState } from "react";
import ErrorList from "./layout/ErrorList";
import translateServerErrors from "../services/translateServerErrors";

const TicklistForm = ({ changePane, climbId, user }) => {
  
  const [ticklist, setTicklist] = useState({
    notes: "",
    date: ""
  })
  const [errors, setErrors] = useState([])
  const [submitted, setSubmitted] = useState(0)
  
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
        setSubmitted(1)
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

  const tickSubmitted = <>
    <p>Climb Submitted!</p>
    <a href={`/profile/${user.id}`}>Click here to view your ticklist</a>
    </>

  return (
    <>
    <p onClick={changePane} className="area-climb-button ">Show climb details</p>
    <form onSubmit={submitNewTick}>
        <label>
          Notes:
          <textarea
            name="notes"
            onChange={handleInputChange}
            value={ticklist.notes}
          />
        </label>

        <label>
          Date Sent:
          <input
            type="date"
            name="date"
            onChange={handleInputChange}
            value={ticklist.date}
            min="1930-01-01"
            max={new Date().toLocaleDateString('en-ca')}
          />
        </label>
        
        <ErrorList errors={errors} />
        <div className="button-group">
          <button type="button" className="button" onClick={clearForm}>
            Clear
          </button>
          <input className="button" type="submit" value="Submit" />
          { submitted === 0 ? null : tickSubmitted}
        </div>
      </form>
    </>
  )
}

export default TicklistForm