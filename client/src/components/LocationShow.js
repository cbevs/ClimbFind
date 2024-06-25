import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import AreaTile from "./AreaTile"
import AreaForm from "./AreaForm"
import mapLoader from "../services/mapLoader"
import WeatherPane from "./WeatherPane"
import AddCoordinates from "./AddCoordinates"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const LocationShow = (props) => {
  const { id } = useParams()
  const [location, setLocation] = useState([])
  const [showNewAreaForm, setShowNewAreaForm] = useState(false)
  const [loaded, setLoaded] = useState("page-loading")
  let locationPane
  let areasArray
  let weatherPane
  let locationDataArea

  const getLocation = async () => {
    try {
      const response = await fetch(`/api/v1/locations/${id}`)
      if (!response.ok) {
        const newError = new Error(`${response.status} (${response.statusText})`)
        throw newError
      }
      const responseBody = await response.json()
      setLocation(responseBody.location)
      if (responseBody.location.latitude && responseBody.location.longitude) {
        mapLoader(responseBody.location.latitude, responseBody.location.longitude)
      }
      setLoaded("hidden")
    } catch (error) {
      console.error(error)
    }
  }
  

  const changePane = () => {
    if (showNewAreaForm) {
      setShowNewAreaForm(false)
    } else {
      setShowNewAreaForm(true)
    }
  }

  if (location.weather) {
    weatherPane = <WeatherPane weatherData={location.weather} name={location.name} />
  }
  
  if (!location.latitude && !location.longitude && loaded === "hidden" && props.user ) {
    locationDataArea = (
      <>
        <p className="coordinates-p">Have the coordinates? Add them below!</p>
        <AddCoordinates location={location} setLocation={setLocation} />
      </>
    )
  } else {
    locationDataArea = (
      <div className="grid-x">
        <div className="cell small-12 medium-10 large-6">
          <div id="map" className="map-block"></div>
        </div>

        <div className="cell small-12 medium-10 large-6 weather-block overflow-block">
          {weatherPane}
        </div>
      </div>
    )
  }

  if (props.user) {
    locationPane = (
      <>
        <h2 className="show-h2">{location.name}</h2>
        <p className="show-p">{location.location}</p>
        <p className="show-p">{location.description}</p>
        <div className="crud-buttons">
          <FontAwesomeIcon icon="fa-solid fa-plus" title="Add New Area" className="add-icon" onClick={changePane} />
          <p className="icon-text-p">Add new area</p>
        </div>
      </>
    )
  } else {
    locationPane = (
      <>
        <h2 className="show-h2">{location.name}</h2>
        <p className="show-p">{location.location}</p>
        <p className="show-p">{location.description}</p>
      </>
    )
  }

  useEffect(() => {
    getLocation()
  }, [])

  if (Object.keys(location).length !== 0) {
    areasArray = location.areas.map((area) => {
      return <AreaTile key={area.id} area={area} />
    })
  }

  return (
    <div className="show-block">
      <div className={loaded}></div>
      <div className="grid-x">
        <div
          className="cell small-12 medium-10 large-6 hero-left-block overflow-block"
        >
          {(!showNewAreaForm) ? (
            locationPane
          ) : (
            <AreaForm
              changePane={changePane}
              locationId={id}
              location={location}
              setLocation={setLocation}
            />
          )}
        </div>
        <div
          className="cell small-12 medium-10 large-6 orange-right-block overflow-block"
        >
          {areasArray}
        </div>
      </div>
      {locationDataArea}
    </div>
  )
}

export default LocationShow
