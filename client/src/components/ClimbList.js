import React, { useState, useEffect } from "react";
import ClimbTile from "./ClimbTile";
import ClimbSearch from "./ClimbSearch";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ClimbList = (props) => {
  const [climbs, setClimbs] = useState([])

  const getClimbs = async () => {
    try {
      const response = await fetch("/api/v1/climbs/recents")
      if(!response.ok) {
        const newError = new Error(`${response.status} (${response.statusText})`)
        throw newError
      }
      const responseBody = await response.json()
      setClimbs(responseBody.climbs)
    } catch(error) {
      console.error(error)
    }
  }
  
  const climbsArray = climbs.map(climb => {
    return <ClimbTile key={climb.id} climb={climb} />
  })

  useEffect(() => {
    getClimbs()
  }, [])

  return (
    <div className="show-block">
      <div className="grid-x">
        <div className="cell small-2 medium-4 large-4 hero-left-block overflow-block left-radius">
        <Link to="/" className="back-link">
          <FontAwesomeIcon icon="fa-solid fa-chevron-left" />
            Back
        </Link>
          <h2 className="hero-h2">Here are the latest climbs in our database!</h2>
          <p>Search For a Climb</p>
          <ClimbSearch setClimbs={setClimbs}/>
        </div>
        <div className="cell small-2 medium-4 large-4 hero-right-block overflow-block right-radius">
          { climbsArray.length !== 0 ? climbsArray : <div className="no-climbs"><h2>No climbs found!</h2></div>}
        </div>
      </div>
    </div>
  )
}

export default ClimbList