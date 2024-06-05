import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ClimbTile from "../ClimbTile"
import climbSearchFunction from "../../services/climbSearchFunction"

const SidepullPage = () => {
  const [climbs, setClimbs] = useState([])
  
  let climbPane

  const getClimbs = async () => {
    const climbs = await climbSearchFunction(["sidepulls"])
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
          <h2 className="hero-h2">Side Pull</h2>
          <p className="hold-segment">What is an side pull?</p>
          <p>
            Side pulls are a cousin to down-pulling edges and underclings. The difference is that they are rotated 90 degrees and grabbed with your palm facing inward. As with underclings, side pulls require a good bit of body positioning to get the most out of them.
          </p>
          <p className="hold-segment">How do I get better at side pulls?</p>
          <p>Climb on them more! When on a side pull, try to get your legs pushing in the same direction you are pulling. This will put more force into your hands, thus making your purchase on the side pull better. If you have access to a spray wall (a wall with a lot of holds and (usually) no marked routes set on it), create climbs that utilize side pulls and work them until you feel more confident, then make the climb harder!</p>
        </div>
        <div className="cell small-12 medium-4 large-4 hero-right-block overflow-block right-radius">
          {climbPane}
        </div>
      </div>
    </div>
  )
}

export default SidepullPage