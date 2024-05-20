import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ClimbTile from "./ClimbTile";
import ClimbForm from "./ClimbForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AreaShow = (props) => {

  const [area, setArea] = useState({})
  const [showNewClimb, setShowNewClimb] = useState(0)
  let climbsArray
  const getArea = async () => {
    const areaId = props.match.params.id
    try {
      const response = await fetch(`/api/v1/areas/${areaId}`)
      if(!response.ok) {
        const newError = new Error(`${response.status} (${response.statusText})`)
        throw newError
      }
      const responseBody = await response.json()
      setArea(responseBody.areas)
    } catch(error) {
      console.error(error)
    }
  }
  
  if(Object.keys(area).length !== 0){
     climbsArray = area.climbs.map(climb => {
      return <ClimbTile key={climb.id} climb={climb} />
    })
  }

  const showNewClimbForm = () => {
    if (showNewClimb === 1) {
      setShowNewClimb(0)
    } else {
      setShowNewClimb(1)
    }
  }

  const areaDetails = 
   <>
      <h2 className="show-h2">{area.name}</h2>
      <Link to={`/locations/${area.locationId}`} className="climb-link light show-a">{area.locationName}</Link>
      <p className="show-p heavy">{area.climbCount} { area.climbCount === "0" || area.climbCount > 1 ? "climbs" : "climb" }</p>
      <p className="show-p">{area.description}</p>
      <p onClick={showNewClimbForm} className="area-climb-button">Add new climb</p>
    </>

    const newClimbForm = <ClimbForm 
      showNewClimbForm={showNewClimbForm} 
      setArea={setArea} 
      area={area}
      areaId={area.id} 
    />

  
  useEffect(() => {
    getArea()
  }, [])

  return (
    <div className="show-block">
    <div className="grid-x">
      <div className="cell small-2 medium-4 large-4 hero-left-block overflow-block">
        <Link to="/areas" className="back-link">
          <FontAwesomeIcon icon="fa-solid fa-chevron-left" />
            Back to area list
        </Link>
        { showNewClimb === 0 ? areaDetails : newClimbForm }
      </div>
      <div className="cell small-2 medium-4 large-4 hero-right-block overflow-block">
        {climbsArray}
      </div>
    </div>
  </div>
  )
}

export default AreaShow