import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ClimbTile from "../ClimbTile";
import climbSearchFunction from "../../services/climbSearchFunction";

const JugPage = () => {
  const [climbs, setClimbs] = useState([])
  
  let climbPane

  const getClimbs = async () => {
    const climbs = await climbSearchFunction(["jugs"])
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
        <Link to="/features" className="back-link">
          <FontAwesomeIcon icon="fa-solid fa-chevron-left" />
            Back to features list
        </Link>
        <h2 className="hero-h2">Jug</h2>
        <p className="hold-segment">What is a jug?</p>
        <p>Jugs are pretty much every beginner's favorite hold and every strong climber's savior mid-climb. They come in all shapes and sizes, but all have one thing in common: they're like grabbing a handle or as you'll often hear climbers lovingly say: "it's a bucket!". Jugs are the holds that you probably started out on!</p>
        <p className="hold-segment">How do I get better at jugs?</p>
        <p>Jugs aren't usually something that climbers seek to get better at, as they generally are pretty easy to grab right off the bat. If you are looking to get better at them, however, start by climbing on them more!</p>
        </div>
        <div className="cell small-12 medium-4 large-4 hero-right-block overflow-block right-radius">
          {climbPane}
        </div>
      </div>
    </div>
  )
}

export default JugPage