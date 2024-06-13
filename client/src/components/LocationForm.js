import React, { useState } from "react";
import ErrorList from "./layout/ErrorList"
import translateServerErrors from "../services/translateServerErrors"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LocationForm = ({ showNewLocationForm, setLocations, locations }) => {
  
  const [newLocation, setNewLocation] = useState({
    name: "",
    location: "",
    description: "",
    latitude: "",
    longitude: ""
  })
  
  const [errors, setErrors] = useState([])

  const handleInputChange = (event) => {
    setNewLocation({
      ...newLocation,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const submitNewLocation = async (event) => {
    event.preventDefault()
    try{
      const response = await fetch("/api/v1/locations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLocation)
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
        const newLocation = await response.json()
        setLocations([...locations, newLocation.location])
        showNewLocationForm()
      }
    } catch(error) {
      console.error(error)
    }
  }

  const clearForm = (event) => {
    event.preventDefault()
    setNewLocation({
      name: "",
      location: "",
      description: "",
      latitude: "",
      longitude: ""
    })
    setErrors([])
  }

  return (
    <>
    <FontAwesomeIcon icon="fa-solid fa-arrow-left" title="Previous Window" className="add-icon" onClick={showNewLocationForm} />
            <p className="icon-text-p">Take me back!</p>
    <form onSubmit={submitNewLocation}>
        <label>
          <p className="form-input-p">Location Name:</p>
          <input
          className="new-form-option"
            type="text"
            name="name"
            onChange={handleInputChange}
            value={newLocation.name}
          />
        </label>

        <label>
        <p className="form-input-p"> Where is this location?:</p>
          <textarea
            name="location"
            onChange={handleInputChange}
            value={newLocation.location}
          />
        </label>

        <label>
        <p className="form-input-p">Description:</p>
          <textarea
            name="description"
            onChange={handleInputChange}
            value={newLocation.description}
          />
        </label>

        <label>
        <p className="form-input-p">Latitude:</p>
          <input
            className="new-form-option"
            type="text"
            name="latitude"
            onChange={handleInputChange}
            value={newLocation.latitude}
          />
        </label>

        <label>
        <p className="form-input-p">Longitude:</p>
          <input
            className="new-form-option"
            type="text"
            name="latitude"
            onChange={handleInputChange}
            value={newLocation.longitude}
          />
        </label>
        
        <ErrorList errors={errors} />
        <div className="button-group">
          <button type="button" className="button app-button" onClick={clearForm}>
            Clear
          </button>
          <input className="button app-button" type="submit" value="Submit" />
        </div>
      </form>
    </>
  )
}

export default LocationForm