import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ClimbTile from "../ClimbTile"
import climbSearchFunction from "../../services/climbSearchFunction"

const UnderclingPage = () => {
  const [climbs, setClimbs] = useState([])
  
  let climbPane

  const getClimbs = async () => {
    const climbs = await climbSearchFunction(["underclings"])
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
          <h2 className="hero-h2">Undercling</h2>
          <p className="hold-segment">What is an undercling?</p>
          <p>
            Underclings come in all shapes and sizes, but they all have one thing in common, they're a normal hold but flipped upside down! Underclings can be tricky, as they often require a good body position to utilize correctly. Some can be below your shoulders while others can be above your head.
          </p>
          <p className="hold-segment">How do I get better at underclings?</p>
          <p>As with most holds, simply climbing on them more will help you get better at underclings. You can also try the following to help you send your next undercling project:</p>
          <ul>
            <li>
              Try to get as high as possible on the undercling. This may involve you have to do some tricky footwork. The higher your feet in comparison to the undercling, the more weight you can apply to the hold.
            </li>
            <li>
              For higher underclings, you can try to dynamically move into the undercling to help gain both more leverage on the hold and possibly open yourself to higher feet.
            </li>
            <li>
              Some underclings can be made easier by using your thumb to pinch/press off of the "top" of the hold.
            </li>
            <li>
              Work on your posterior chain and arm strength! The key to underclings is to drive hard through your feet to force your upper body into the hold. Bicep strength can help as well with pulling yourself in closer to the hold.
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

export default UnderclingPage