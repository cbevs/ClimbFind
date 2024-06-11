import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ClimbTile from "../ClimbTile"
import climbSearchFunction from "../../services/climbSearchFunction"

const OverhangPage = () => {
  const [climbs, setClimbs] = useState([])
  
  let climbPane

  const getClimbs = async () => {
    const climbs = await climbSearchFunction(["overhangs"])
    setClimbs(climbs)
  }

  const climbsArray = climbs.map((climb) => {
    return <ClimbTile key={climb.id} climb={climb} />
  })

  useEffect(() => {
    getClimbs()
  }, [])

  if (climbs.length > 0) {
    climbPane = climbsArray
  } else {
    climbPane = <div className="no-climbs"><h2>No climbs found!</h2></div>
  }

  return (
    <div className="show-block">
      <div className="grid-x">
        <div className="cell small-12 medium-4 large-4 hero-left-block overflow-block left-radius">     
          <h2 className="hero-h2">Overhang</h2>
          <p className="hold-segment">What is an overhang?</p>
          <p>
            Overhangs are not holds, but they're a type of climbing! Sometimes called by beginner climbers "upside down climbing", overhangs are climbs that are on an angle less than 90 degrees. Overhangs range from slighty-angled climbing to full on roof climbing. 
          </p>
          <p className="hold-segment">How do I get better at overhangs?</p>
          <p>Start small and work your way up! Begin climbing on some easier angles that are still slightly overhanging to help build overhang-specific body awareness. Things to keep in mind when climbing on overhang:</p>
          <ul>
            <li>
              Try to keep your feet higher to help engage your core.
            </li>
            <li>
              Use your toes to pull yourself into the wall. Imagine that the end of your climbing shoe is a hook that can latch into holds.
            </li>
            <li>
              If you have access to a spray wall (a wall with a lot of holds and (usually) no marked routes set on it), force yourself to get on climbs with small/bad feet.
            </li>
            <li>
              Don't forget supplementary training! Doing core and shoulder workouts will largely benefit your overhang climbing skills.
            </li>
          </ul>
        </div>
        <div className="cell small-12 medium-4 large-4 hero-right-block overflow-block right-radius">
          {climbPane}
        </div>
      </div>
    </div>
  )
}

export default OverhangPage