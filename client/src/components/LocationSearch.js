import React, { useState } from "react";

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
      <p onClick={showSearchForm} className="area-climb-button">Take me back!</p>
      <form onSubmit={sendSearch}>
        <label>
          Location Name:
          <input
          className="new-form-option"
            type="text"
            name="name"
            onChange={handleInputChange}
            value={location.name}
          />
        </label>

        <div className="button-group">
          <button type="button" className="button" onClick={clearForm}>
            Clear
          </button>
          <input type="submit" className="button" />
          <button type="button" className="button" onClick={resetResults}>
            Reset Locations
          </button>
        </div>
      </form>
    </>
  )
}

export default LocationSearch