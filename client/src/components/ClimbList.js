import React, { useState, useEffect } from "react";
import ClimbTile from "./ClimbTile";

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
    <div className="hero-block">
      <div className="grid-x">
        <div className="cell medium-6 large-4 hero-left-block">
          <h2 className="hero-h2">Here are the latest climbs in our database!</h2>
        </div>
        <div className="cell medium-6 large-8 hero-right-block overflow-block">
          {climbsArray}
        </div>
      </div>
    </div>
  )
}

export default ClimbList