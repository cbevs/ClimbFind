import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import LocationTile from "./LocationTile"
import LocationForm from "./LocationForm"
import LocationSearch from "./LocationSearch"

const LocationList = (props) => {
  const [locations, setLocations] = useState([])
  const [showNewLocation, setShowNewLocation] = useState(0)
  let locationPane

  const getLocations = async () => {
    try {
      const response = await fetch("/api/v1/locations")
      if (!response.ok) {
        const newError = new Error(`${response.status} (${response.statusText})`)
        throw newError
      }
      const responseBody = await response.json()
      setLocations(responseBody.locations)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getLocations()
  }, [])

  const showNewLocationForm = () => {
    if (showNewLocation === 1) {
      setShowNewLocation(0)
    } else {
      setShowNewLocation(1)
    }
  }

  const showSearchForm = () => {
    if (showNewLocation === 2) {
      setShowNewLocation(0)
    } else {
      setShowNewLocation(2)
    }
  }

  const locationArray = locations.map((location) => {
    return <LocationTile key={location.id} location={location} />
  })

  const searchPane = (
    <>
      <LocationSearch
        showSearchForm={showSearchForm}
        setLocations={setLocations}
        locations={locations}
      />
    </>
  )

  if (props.user) {
    locationPane = (
      <>
        <h2 className="hero-h2">Here are the locations we have in our database!</h2>
        <p>Don't see the location you're looking for? Add it below!</p>
        <p onClick={showNewLocationForm} className="area-climb-button">
          Add new location
        </p>
        <p onClick={showSearchForm} className="area-climb-button">
          Search for a location
        </p>
      </>
    )
  } else {
    locationPane = (
      <>
        <h2 className="hero-h2">Here are the locations we have in our database!</h2>
        <p>
          Don't see the location you're looking for?
          <Link to="/user-sessions/new" className="no-format-link location-sign-in">Sign in to add it!</Link>
        </p>
        <p onClick={showSearchForm} className="area-climb-button">
          Search for a location
        </p>
      </>
    )
  }
  
  const newLocationForm = (
    <LocationForm
      showNewLocationForm={showNewLocationForm}
      setLocations={setLocations}
      locations={locations}
    />
  )

  return (
    <div className="show-block">
      <div className="grid-x">
        <div className="cell small-12 medium-4 large-4 hero-left-block overflow-block left-radius">
          {showNewLocation === 0
            ? locationPane
            : showNewLocation === 1
              ? newLocationForm
              : searchPane}
        </div>
        <div className="cell small-12 medium-4 large-4 hero-right-block overflow-block right-radius">
          {locationArray}
        </div>
      </div>
    </div>
  )
}

export default LocationList
