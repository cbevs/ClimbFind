import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import ClimbTile from "./ClimbTile"
import ClimbForm from "./ClimbForm"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useParams } from "react-router-dom"
import AddCoordinates from "./AddCoordinates"
import WeatherPane from "./WeatherPane"
import mapLoader from "../services/mapLoader"

const AreaShow = (props) => {
  const { id } = useParams()
  const [area, setArea] = useState({})
  const [showNewClimb, setShowNewClimb] = useState(0)
  const [showClimbData, setShowClimbData] = useState(0)
  const [leftRadiusClass, setLeftRadiusClass] = useState("left-radius")
  const [rightRadiusClass, setrightRadiusClass] = useState("right-radius")
  let climbList
  let climbDataArea
  let expandArrow
  let weatherPane
  let areaDetails

  const getArea = async () => {
    try {
      const response = await fetch(`/api/v1/areas/${id}`)
      if (!response.ok) {
        const newError = new Error(`${response.status} (${response.statusText})`)
        throw newError
      }
      const responseBody = await response.json()
      setArea(responseBody.areas)
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

  if (area.latitude && area.longitude && showClimbData > 0) {
    mapLoader(area.latitude, area.longitude)
  }

  const showNewClimbForm = () => {
    if (showNewClimb === 1) {
      setShowNewClimb(0)
    } else {
      setShowNewClimb(1)
    }
  }

  const showClimbDataPane = () => {
    if (showClimbData === 1) {
      setShowClimbData(0)
      setLeftRadiusClass("left-radius")
      setrightRadiusClass("right-radius")
    } else {
      setLeftRadiusClass("")
      setrightRadiusClass("")
      setShowClimbData(1)
    }
  }

  if (area.weather) {
    weatherPane = <WeatherPane weatherData={area.weather} name={area.name} />
  } else {
    weatherPane = (
      <>
        <p className="coordinates-p">Have the coordinates? Add them below!</p>
        <AddCoordinates area={area} setArea={setArea} />
      </>
    )
  }

  if (props.user) {
    areaDetails = (
      <>
        <h2 className="show-h2">{area.name}</h2>
        <Link to={`/locations/${area.locationId}`} className="climb-link light show-a">
          {area.locationName}
        </Link>
        <p className="show-p heavy">
          {area.climbCount} {area.climbCount === "0" || area.climbCount > 1 ? "climbs" : "climb"}
        </p>
        <p className="show-p">{area.description}</p>
        <div className="crud-buttons">
          <p onClick={showNewClimbForm} className="area-climb-button">
            Add new climb
          </p>
        </div>
      </>
    )
  } else {
    areaDetails = (
      <>
        <h2 className="show-h2">{area.name}</h2>
        <Link to={`/locations/${area.locationId}`} className="climb-link light show-a">
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
  
  const climbData = (
    <div className="grid-x">
      <div className="cell small-12 medium-4 large-4">
        <div id="map" className="map-block"></div>
      </div>

      <div className="cell small-12 medium-4 large-4 weather-block overflow-block">
        {weatherPane}
      </div>
    </div>
  )

  if (showClimbData === 1) {
    climbDataArea = climbData
    expandArrow = (
      <>
        <FontAwesomeIcon icon="fa-solid fa-angles-up" />
        <p className="climb-arrow-p">Hide map & weather</p>
      </>
    )
  } else {
    climbDataArea = null
    expandArrow = (
      <>
        <FontAwesomeIcon icon="fa-solid fa-angles-down" />
        <p className="climb-arrow-p">Show map & weather</p>
      </>
    )
  }

  useEffect(() => {
    getArea()
  }, [])

  return (
    <div className="show-block">
      <div className="grid-x">
        <div
          className={`cell small-12 medium-4 large-4 hero-left-block overflow-block ${leftRadiusClass}`}
        >
          <Link to="/areas" className="back-link">
            <FontAwesomeIcon icon="fa-solid fa-chevron-left" />
            Back to area list
          </Link>
          {showNewClimb === 0 ? areaDetails : newClimbForm}
          <span className="climb-arrow" onClick={showClimbDataPane}>
            {expandArrow}
          </span>
        </div>
        <div
          className={`cell small-12 medium-4 large-4 hero-right-block overflow-block ${rightRadiusClass}`}
        >
          {climbList}
        </div>
      </div>
      {climbDataArea}
    </div>
  )
}

export default AreaShow
