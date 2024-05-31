import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ClimbTile from "../ClimbTile"
import climbSearchFunction from "../../services/climbSearchFunction"

const HeelHookPage = () => {
  const [climbs, setClimbs] = useState([])
  
  let climbPane

  const getClimbs = async () => {
    const climbs = await climbSearchFunction(["heel hooks"])
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
          <h2 className="hero-h2">Heel Hook</h2>
          <p className="hold-segment">What is a heel hook?</p>
          <p>
            A heel hook is when you place the ball of your heel on a hold and use it to either bring your body closer to the wall or a hold, or to help gain balance/height when no horizontal feet exist. Heel hooks are used in all levels of climbing, making them easy to work on getting better at! 
          </p>
          <p className="hold-segment">How do I get better at heel hooks?</p>
          <p>Make sure you are pointing your toes away from the wall when possible! Instead of throwing your heel on the hold and simply putting your weight on it, put that heel to work and pull with your legs to bring your body closer to the wall. Most heel hooks require hamstring and core strength as well as flexibility, so get to work (squats, deadlifts, kettlebell swings, stretch)! You can practice them by hopping on an easy climb and try to complete each move using heel hooks to move yourself up the route instead of pushing with your legs.</p>
        </div>
        <div className="cell small-12 medium-4 large-4 hero-right-block overflow-block right-radius">
          {climbPane}
        </div>
      </div>
    </div>
  )
}

export default HeelHookPage