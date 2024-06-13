import React, { useState } from "react";
import ErrorList from "./layout/ErrorList";
import translateServerErrors from "../services/translateServerErrors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const AreaForm = ({ changePane, locationId, location, setLocation }) => {

  const [newArea, setNewArea] = useState({
    name: "",
    description: "",
    latitude: "",
    longitude: ""
  })
  const [errors, setErrors] = useState([])

  const handleInputChange = (event) => {
    setNewArea({
      ...newArea,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const submitArea = async (event) => {
    event.preventDefault()
    try {
      const response = await fetch(`/api/v1/locations/${locationId}/add-area`, {
        method: "POST",
        headers: new Headers({ "Content-Type" : "application/json" }),
        body: JSON.stringify(newArea)
      })
      if(!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          return setErrors(newErrors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw error
        }
      }
      const responseBody = await response.json()
      setLocation({ ...location, areas: [...location.areas, responseBody.area]})
      changePane()
    } catch(error) {
      console.error(error)
    }
  }

  const clearForm = (event) => {
    event.preventDefault()
    setNewArea({
      name: "",
      description: "",
      latitude: "",
      longitude: ""
    })
    setErrors([])
  }

  return (
    <>
      <FontAwesomeIcon icon="fa-solid fa-arrow-left" title="Previous Window" className="add-icon" onClick={changePane} />
      <p className="icon-text-p">Take me back!</p>
      <form onSubmit={submitArea}>
        <label>
        <p className="form-input-p">Area Name:</p>
          <input
            className="new-form-option"
            type="text"
            name="name"
            onChange={handleInputChange}
            value={newArea.name}
          />
        </label>

        <label>
        <p className="form-input-p">Description:</p>
          <textarea
            className="new-form-option"
            type="text"
            name="description"
            onChange={handleInputChange}
            value={newArea.description}
          />
        </label>

        <label>
          <p className="form-input-p">Latitude:</p>
          <input
            className="new-form-option"
            type="text"
            name="latitude"
            onChange={handleInputChange}
            value={newArea.latitude}
          />
        </label>

        <label>
          <p className="form-input-p">Longitude:</p>
          <input
            className="new-form-option"
            type="text"
            name="longitude"
            onChange={handleInputChange}
            value={newArea.longitude}
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

export default AreaForm