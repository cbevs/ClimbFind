import React, { useState } from "react";
import getCoordinateErrors from "../services/getCoordinateErrors";
import CoordinateErrors from "./CoordinateErrors";

const AddCoordinates = ({ area, setArea, location, setLocation }) => {

  const [errors, setErrors] = useState([])
  const [coordinates, setCoordinates] = useState({
    latitude: "",
    longitude: ""
  })

  const clearForm = (event) => {
    event.preventDefault()
    setCoordinates({
      latitude: "",
      longitude: ""
    })
    setErrors([])
  }

  const handleInputChange = (event) => {
    setCoordinates({
      ...coordinates,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const submitCoordinates = async () => {
    event.preventDefault()
    const newErrors = getCoordinateErrors(coordinates.latitude, coordinates.longitude)

    if(newErrors.length > 0) {
      setErrors(newErrors)
    } else {
      const coordinatesObject = { latitude: coordinates.latitude, longitude: coordinates.longitude }
      try{
        if(area) {
          const response = await fetch(`/api/v1/areas/${area.id}/coordinates`, {
            method: "PATCH",
            headers: new Headers({ "Content-Type": "application/json" }),
            body: JSON.stringify(coordinatesObject)
          })
          if (!response.ok) {
            const newError = new Error(`${response.status} (${response.statusText})`)
          throw newError
          }
          const responseBody = await response.json()
          setArea(responseBody.areas)
        }
        if (location) {
          const response = await fetch(`/api/v1/locations/${location.id}/coordinates`, {
            method: "PATCH",
            headers: new Headers({ "Content-Type": "application/json" }),
            body: JSON.stringify(coordinatesObject)
          })
          if (!response.ok) {
            const newError = new Error(`${response.status} (${response.statusText})`)
          throw newError
          }
          const responseBody = await response.json()
          setLocation(responseBody.location)
        }
      } catch(error) {
        console.error(error)
      }
    }
  }

  return (
    <>
      <form onSubmit={submitCoordinates} className="coordinates-form">

        <label>
          Latitude:
          <input
            className="new-form-option"
            type="text"
            name="latitude"
            onChange={handleInputChange}
            value={coordinates.latitude}
          />
        </label>

        <label>
          Longitude:
          <input
            className="new-form-option"
            type="text"
            name="longitude"
            onChange={handleInputChange}
            value={coordinates.longitude}
          />
        </label>
        <div className="button-group">
          <button type="button" className="button" onClick={clearForm}>
            Clear
          </button>
          <input className="button" type="submit" value="Submit" />
        </div>
        <CoordinateErrors errors={errors} />
      </form>
    </>
  )
}

export default AddCoordinates