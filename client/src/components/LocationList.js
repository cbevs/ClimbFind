import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import LocationTile from "./LocationTile"
import LocationForm from "./LocationForm"
import LocationSearch from "./LocationSearch"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome" 

const LocationList = (props) => {
  const [locations, setLocations] = useState([])
  const [showNewLocation, setShowNewLocation] = useState(0)
  const [loaded, setLoaded] = useState("right-loading")
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
      setLoaded("hidden")
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
        <div className="crud-buttons">
          <div>
            <FontAwesomeIcon icon="fa-solid fa-plus" title="Add New Area" className="add-icon" onClick={showNewLocationForm} />
            <p className="icon-text-p">Add new location</p>
          </div>
          <div>
            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" title="Add New Area" className="add-icon" onClick={showSearchForm} />
            <p className="icon-text-p">Search for a location</p>
          </div>
        </div>
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
      <div className={loaded}></div>
      <div className="grid-x">
        <div className="cell small-12 medium-10 large-6 hero-left-block overflow-block ">
          {showNewLocation === 0
            ? locationPane
            : showNewLocation === 1
              ? newLocationForm
              : searchPane}
        </div>
        <div className="cell small-12 medium-10 large-6 orange-right-block overflow-block ">
          {locationArray}
        </div>
      </div>
    </div>
  )
}

export default LocationList
