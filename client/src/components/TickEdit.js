import React, { useState } from "react";
import ErrorList from "./layout/ErrorList";
import translateServerErrors from "../services/translateServerErrors";

const TickEdit = ({ existingTick, changePane, ticklist, setTicklist }) => {
  const [tick, setTick] = useState({
    notes: existingTick.notes,
    date: (new Date(existingTick.date)).toLocaleDateString("en-ca")
  })
  const [errors, setErrors] = useState([])

  const handleInputChange = (event) => {
    setTick({
      ...tick,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const submitUpdatedTick = async (event) => {
    event.preventDefault()
    tick.date = tick.date.replaceAll("/", "-")
    tick.tickId = existingTick.id
    try {
      const response = await fetch(`/api/v1/users/ticklists`, {
        method: "PATCH",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify(tick),
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
        const responseBody = await response.json()
        const newTicklist = ticklist.map((tick) => {
          if (tick.id === responseBody.ticklist.id) {
            return responseBody.ticklist
          } else {
            return tick
          }
        })
        setTicklist(newTicklist)
        changePane()
      }
    } catch (error) {
      console.error(error)
    }
  }
  
  return(
    <form onSubmit={submitUpdatedTick} className="tick-edit">
        <label>
          Notes:
          <textarea
            name="notes"
            onChange={handleInputChange}
            value={tick.notes || ""}
          />
        </label>

        <label>
          Date Sent:
          <input
            type="date"
            name="date"
            className="new-form-option"
            onChange={handleInputChange}
            value={tick.date}
            min="1930-01-01"
            max={new Date().toLocaleDateString('en-ca')}
          />
        </label>
        
        <ErrorList errors={errors} />
        <div className="button-group">
          <input className="button" type="submit" value="Submit" />
        </div>
      </form>
  )
}

export default TickEdit