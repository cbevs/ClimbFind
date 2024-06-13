import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ClimbTile from "../ClimbTile"
import climbSearchFunction from "../../services/climbSearchFunction"

const SloperPage = () => {
  const [climbs, setClimbs] = useState([])
  
  let climbPane

  const getClimbs = async () => {
    const climbs = await climbSearchFunction(["slopers"])
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
          <h2 className="hero-h2">Sloper</h2>
          <p className="hold-segment">What is a sloper?</p>
          <p>
            A sloper is named aptly: a hold that has a sloping edge. Slopers come in all shapes and
            sizes, but all have one common property in that they all cause climbers to slide right
            off of them. Some are easier, some are harder! Slopers are known to shred your skin as
            you slide off of them, so be sure to try hard when you encounter one!
          </p>
          <p className="hold-segment">How do I get better at slopers?</p>
          <p>
            Slopers are one of those holds that are tough to train off the wall. Your best bet for
            getting better at them is to purposely seek out climbs that have them! Some things to
            keep in mind while climbing on slopers:
          </p>
          <ul>
            <li>Try to maximize the surface area of your hand on the sloper.</li>
            <li>
              Keep your weight below the sloper. This means keeping your arms straight if possible
              and having more of a bend in your legs.
            </li>
            <li>
              Don't crimp the sloper (unless you are on your send go; then you gotta do what you
              gotta do)! Make the conscious decision to grab a sloper as a sloper so you can get
              better at them! Practice makes perfect!
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

export default SloperPage