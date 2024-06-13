import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import ClimbTile from "./ClimbTile"
import ClimbForm from "./ClimbForm"
import { useParams } from "react-router-dom"
import AddCoordinates from "./AddCoordinates"
import WeatherPane from "./WeatherPane"
import mapLoader from "../services/mapLoader"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const AreaShow = (props) => {
  const { id } = useParams()
  const [area, setArea] = useState({})
  const [showNewClimb, setShowNewClimb] = useState(false)
  const [loaded, setLoaded] = useState("page-loading")
  let climbList
  let weatherPane
  let areaDetails
  let climbData 

  const getArea = async () => {
    try {
      const response = await fetch(`/api/v1/areas/${id}`)
      if (!response.ok) {
        const newError = new Error(`${response.status} (${response.statusText})`)
        throw newError
      }
      const responseBody = await response.json()
      setArea(responseBody.areas)
      if (responseBody.areas.latitude && responseBody.areas.longitude) {
        mapLoader(responseBody.areas.latitude, responseBody.areas.longitude)
      }
      setLoaded("hidden")
    } catch (error) {
      console.error(error)
    }
  }

  if (Object.keys(area).length !== 0) {
    if (area.climbs.length !== 0) {
      climbList = area.climbs.map((climb) => {
        return <ClimbTile key={climb.id} climb={climb} />
      })
    } else {
      climbList = (
        <div className="no-items-found">
          <p>No Climbs!</p>
        </div>
      )
    }
  }

  const showNewClimbForm = () => {
    if (showNewClimb) {
      setShowNewClimb(false)
    } else {
      setShowNewClimb(true)
    }
  }

  if (area.weather) {
    weatherPane = <WeatherPane weatherData={area.weather} name={area.name} />
  }

  if (props.user) {
    areaDetails = (
      <>
        <h2 className="show-h2">{area.name}</h2>
        <Link to={`/locations/${area.locationId}`} className="climb-link medium show-a">
          {area.locationName}
        </Link>
        <p className="show-p heavy">
          {area.climbCount} {area.climbCount === "0" || area.climbCount > 1 ? "climbs" : "climb"}
        </p>
        <p className="show-p">{area.description}</p>
        <div className="crud-buttons">
          <FontAwesomeIcon icon="fa-solid fa-plus" title="Add New Climb" className="add-icon" onClick={showNewClimbForm} />
          <p className="icon-text-p">Add new climb</p>
        </div>
      </>
    )
  } else {
    areaDetails = (
      <>
        <h2 className="show-h2">{area.name}</h2>
        <Link to={`/locations/${area.locationId}`} className="climb-link medium show-a">
          {area.locationName}
        </Link>
        <p className="show-p heavy">
          {area.climbCount} {area.climbCount === "0" || area.climbCount > 1 ? "climbs" : "climb"}
        </p>
        <p className="show-p">{area.description}</p>
      </>
    )
  }

  const newClimbForm = (
    <ClimbForm showNewClimbForm={showNewClimbForm} setArea={setArea} area={area} areaId={id} />
  )
  
  if (!area.latitude && !area.longitude && loaded === "hidden" && props.user ) {
    climbData = (
      <>
        <p className="coordinates-p">Have the coordinates? Add them below!</p>
        <AddCoordinates area={area} setArea={setArea} />
      </>
    )
  } else {
  climbData = (
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

  useEffect(() => {
    getArea()
  }, [])

  return (
    <div className="show-block">
      <div className={loaded}></div>
      <div className="grid-x">
        <div
          className="cell small-12 medium-10 large-6 hero-left-block overflow-block"
        >
          {(!showNewClimb) ? areaDetails : newClimbForm}
        </div>
        <div
          className="cell small-12 medium-10 large-6 hero-right-block overflow-block"
        >
          {climbList}
        </div>
      </div>
      {climbData}
    </div>
  )
}

export default AreaShow
