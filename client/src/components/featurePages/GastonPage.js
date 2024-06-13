import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ClimbTile from "../ClimbTile"
import climbSearchFunction from "../../services/climbSearchFunction"

const GastonPage = () => {
  const [climbs, setClimbs] = useState([])
  
  let climbPane

  const getClimbs = async () => {
    const climbs = await climbSearchFunction(["gastons"])
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
          <h2 className="hero-h2">Gaston</h2>
          <p className="hold-segment">What is an gaston?</p>
          <p>
            No, these holds are not related to the Disney villain! A gaston is the opposite of a <Link to="/features/side-pull" className="no-format-link hold-link">side pull</Link>. Instead of pulling with your palm facing inward, a gaston requires you to have your palm facing outward. It may help to think of the hand position that would be needed to open an elevator door from the middle.
          </p>
          <p className="hold-segment">How do I get better at gastons?</p>
          <p>Search for climbs that have gastons and get to work! If you have access to a spray wall (a wall with a lot of holds and (usually) no marked routes set on it), you can also create your own climbs that incorporate them. Start small and work your way up! For gastons in particular, you want to make sure your shoulders are bulletproof, as they put a lot of strain throughout that chain. Some helpful exercises are:</p>
          <ul>
            <li>Shoulder Press</li>
            <li>I-Y-Ts or other rotator cuff / labrum strengthening exercies</li>
            <li>Push-ups</li>
            <li>Pull-ups</li>
          </ul>
        </div>
        <div className="cell small-12 medium-10 large-6 hero-right-block overflow-block ">
          {climbPane}
        </div>
      </div>
    </div>
  )
}

export default GastonPage