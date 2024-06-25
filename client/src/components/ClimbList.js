import React, { useState, useEffect } from "react";
import ClimbTile from "./ClimbTile";
import ClimbSearch from "./ClimbSearch";

const ClimbList = (props) => {
  const [climbs, setClimbs] = useState([])
  const [loaded, setLoaded] = useState("right-loading")
  const [showNoClimbs, setShowNoClimbs] = useState("hidden")

  const getClimbs = async () => {
    try {
      const response = await fetch("/api/v1/climbs/recents")
      if(!response.ok) {
        const newError = new Error(`${response.status} (${response.statusText})`)
        throw newError
      }
      const responseBody = await response.json()
      setClimbs(responseBody.climbs)
      setLoaded("hidden")
      setShowNoClimbs("no-climbs-h2")
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
      <div className={loaded}></div>
      <div className="grid-x">
        <div className="cell small-12 medium-10 large-6 hero-left-block overflow-block ">
          <h2 className="hero-h2">Here are the latest climbs in our database!</h2>
          <ClimbSearch setClimbs={setClimbs}/>
        </div>
        <div className="cell small-12 medium-10 large-6 orange-right-block overflow-block ">
          { climbsArray.length !== 0 ? climbsArray : <div className="no-climbs"><h2 className={showNoClimbs}>No climbs found!</h2></div>}
        </div>
      </div>
    </div>
  )
}

export default ClimbList