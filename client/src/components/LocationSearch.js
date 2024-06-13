import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LocationSearch = ({ showSearchForm, setLocations }) => {

  const [location, setLocation] = useState({
    name: ""
  })

  const clearForm = () => {
    event.preventDefault()
    setLocation({
      name: ""
    })
  }

  const resetResults = () => {
    event.preventDefault()
    searchForLocation({
      name: ""
    })
    clearForm()
  }

  const handleInputChange = (event) => {
    setLocation({
      ...location,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const sendSearch = () => {
    event.preventDefault()
    searchForLocation(location)
  }

  const searchForLocation = async (formPayload) => {
    event.preventDefault()
    try {
      const response = await fetch("/api/v1/locations/search", {
        method: "POST",
        headers: new Headers({ "Content-Type" : "application/json" }),
        body: JSON.stringify(formPayload)
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const responseBody = await response.json()
      setLocations(responseBody.locations)
    } catch(error) {
        console.error(error)
    }
  }

  return(
    <>
      <FontAwesomeIcon icon="fa-solid fa-arrow-left" title="Previous Area" className="add-icon" onClick={showSearchForm} />
      <p className="icon-text-p">Take me back!</p>
      <form onSubmit={sendSearch}>
        <label>
          <p className="form-input-p">Location Name:</p>
          <input
          className="new-form-option"
            type="text"
            name="name"
            onChange={handleInputChange}
            value={location.name}
          />
        </label>

        <div className="button-group">
          <button type="button" className="button app-button" onClick={clearForm}>
            Clear
          </button>
          <input type="submit" className="button app-button" />
          <button type="button" className="button app-button" onClick={resetResults}>
            Reset Locations
          </button>
        </div>
      </form>
    </>
  )
}

export default LocationSearch