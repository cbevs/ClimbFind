import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import AreaTile from "./AreaTile"
import AreaForm from "./AreaForm";
import mapLoader from "../services/mapLoader";
import WeatherPane from "./WeatherPane";
import AddCoordinates from "./AddCoordinates";

const LocationShow = (props) => {

  const [location, setLocation] = useState([])
  const [showNewAreaForm, setShowNewAreaForm] = useState(0)
  const [showLocationData, setShowLocationData] = useState(0)
  const [leftRadiusClass, setLeftRadiusClass] = useState("left-radius")
  const [rightRadiusClass, setrightRadiusClass] = useState("right-radius")

  let areasArray
  let locationDataArea
  let expandArrow
  let weatherPane

  const getLocation = async () => {
    const locationId = props.match.params.id
    try{
      const response = await fetch(`/api/v1/locations/${locationId}`)
      if (!response.ok) {
        const newError = new Error(`${response.status} (${response.statusText})`)
        throw newError
      }
      const responseBody = await response.json()
      setLocation(responseBody.location)
    } catch(error) {
      console.error(error)
    }
  }

  const changePane = () => {
    if (showNewAreaForm === 1) {
      setShowNewAreaForm(0)
    } else {
      setShowNewAreaForm (1)
    }
  }

  if(location.latitude && location.longitude && showLocationData > 0) {
    mapLoader(location.latitude, location.longitude)
  }

  const showLocationDataPane = () => {
    if (showLocationData === 1) {
      setShowLocationData(0)
      setLeftRadiusClass("left-radius")
      setrightRadiusClass("right-radius")
    } else {
      setLeftRadiusClass("")
      setrightRadiusClass("")
      setShowLocationData(1)
    }
  }

   if(location.weather) {
    weatherPane = <WeatherPane weatherData={location.weather} name={location.name} />
  } else {
    weatherPane = <>
      <p className="coordinates-p">Have the coordinates? Add them below!</p>
      <AddCoordinates location={location} setLocation={setLocation} />
    </>
  }

  const locationData = <div className="grid-x">
    <div className="cell small-2 medium-4 large-4">
      <div id="map" className="map-block"></div>
    </div>
      
    <div className="cell small-2 medium-4 large-4 weather-block overflow-block">
      {weatherPane}
    </div>
  </div> 

  if (showLocationData === 1) {
    locationDataArea = locationData
    expandArrow = <>
      <FontAwesomeIcon icon="fa-solid fa-angles-up" />
      <p className="climb-arrow-p">Hide map & weather</p>
    </>
  } else {
    locationDataArea = null
    expandArrow = <>
      <FontAwesomeIcon icon="fa-solid fa-angles-down" />
      <p className="climb-arrow-p">Show map & weather</p>
    </>
  }

  const locationPane = <>
    <h2 className="show-h2">{location.name}</h2>
    <p className="show-p">{location.location}</p>
    <p className="show-p">{location.description}</p>
    <p onClick={changePane} className="area-climb-button">Add New Area</p>
    </>

  useEffect(() => {
    getLocation()
  }, [])

  if(Object.keys(location).length !== 0){
    areasArray = location.areas.map(area => {
     return <AreaTile key={area.id} area={area} />
   })
 }

  return (
    <div className="show-block">
    <div className="grid-x">
      <div className={`cell small-2 medium-4 large-4 hero-left-block overflow-block ${leftRadiusClass}`}>
        <Link to="/locations" className="back-link">
          <FontAwesomeIcon icon="fa-solid fa-chevron-left" />
            Back to location list
        </Link>
        { showNewAreaForm === 0 ? locationPane : <AreaForm 
          changePane={changePane} 
          locationId={props.match.params.id}
          location={location}
          setLocation={setLocation} 
          /> 
        }
        <span className="climb-arrow" onClick={showLocationDataPane}>
          {expandArrow} 
        </span>
      </div>
      <div className={`cell small-2 medium-4 large-4 hero-right-block overflow-block ${rightRadiusClass}`}>
        {areasArray}
      </div>
    </div>
    {locationDataArea}
  </div>
  )
}

export default LocationShow