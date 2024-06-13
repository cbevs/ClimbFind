import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ClimbTile from "../ClimbTile"
import climbSearchFunction from "../../services/climbSearchFunction"

const MantlePage = () => {
  const [climbs, setClimbs] = useState([])
  
  let climbPane

  const getClimbs = async () => {
    const climbs = await climbSearchFunction(["mantles"])
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
    climbPane = <div className="no-climbs"><h2 className="no-climbs-h2">No climbs found!</h2></div>
  }

  return (
    <div className="show-block">
      <div className="grid-x">
        <div className="cell small-12 medium-10 large-6 hero-left-block overflow-block ">
          <h2 className="hero-h2">Mantle</h2>
          <p className="hold-segment">What is a mantle?</p>
          <p>
            A mantle is the same movement you would use to get out of a pool. You put your arms beneath you and push up to get your legs up to higher feet. One of the more physical moves in climbing, mantles can range from getting out of the pool (easy) to fighting for your life. 
          </p>
          <p className="hold-segment">How do I get better at mantling?</p>
          <p>Mantles can be hard to train on the wall as they aren't always included in gym sets. When you do come across a mantle, try the following:</p>
          <ul>
            <li>
              The higher you can bring your feet, the more you can push off your feet, the less you have to rely on your arms!
            </li>
            <li>
              It may be easier to try to move into the mantle dynamically, removing the initial push-up movement.
            </li>
            <li>
              Triceps play a big role in mantling. To work on your tricep strength, try performing exercises such as tricep pull-downs, overhead tricep extensions, skull crushers, and muscle-ups.
            </li>
          </ul>
        </div>
        <div className="cell small-12 medium-10 large-6 hero-right-block overflow-block ">
          {climbPane}
        </div>
      </div>
    </div>
  )
}

export default MantlePage