import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ClimbTile from "../ClimbTile"
import climbSearchFunction from "../../services/climbSearchFunction"

const ToeHookPage = () => {
  const [climbs, setClimbs] = useState([])
  
  let climbPane

  const getClimbs = async () => {
    const climbs = await climbSearchFunction(["toe-hooks"])
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
          <h2 className="hero-h2">Toe Hook</h2>
          <p className="hold-segment">What is a toe hook?</p>
          <p>
            A toe hook is kind of like the opposite of a <Link to="/features/heel-hook" className="no-format-link hold-link">heel hook</Link>. Instead of pulling with your heel, you're placing the top of your foot on the hold and pulling with it. Toe hooks can be tough to master, but if you can get the technique down, you can use them in many ways on a climb. 
          </p>
          <p className="hold-segment">How do I get better at toe hooks?</p>
          <p>Generally when toe hooking you want to keep your leg straight and imagine you're pulling it up toward your chest in order to create compression. Flex your ankle toward your body to help pull you into the wall. If your leg is bent, try to use your other foot to push off of the wall near your toe hook, creating compression between your feet (this movement is called a bicycle). Try to get as much rubber from the top of your shoe to be in contact with the hold. While not always the case, there are times when your shoe comes into play. A shoe with a full rubber top will be able to toe hook much more effectively than a shoe with a small toe rubber patch.</p>
        </div>
        <div className="cell small-12 medium-4 large-4 hero-right-block overflow-block right-radius">
          {climbPane}
        </div>
      </div>
    </div>
  )
}

export default ToeHookPage