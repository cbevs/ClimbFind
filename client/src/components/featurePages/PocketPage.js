import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ClimbTile from "../ClimbTile"
import climbSearchFunction from "../../services/climbSearchFunction"

const PocketPage = () => {
  const [climbs, setClimbs] = useState([])
  
  let climbPane

  const getClimbs = async () => {
    const climbs = await climbSearchFunction(["pockets"])
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
          <h2 className="hero-h2">Pocket</h2>
          <p className="hold-segment">What is a pocket?</p>
          <p>
            Pockets are the one of the more scarier holds that climbers encounter and there is a good reason for that: they isolate a whole lot of force into your fingers! Pockets are exactly what they sound like, small holes in the rock that fit anywhere from one to three fingers (four fingers would more likely be classified as a jug). The depth of pockets vary as well; you may encounter ones that use your whole finger while some fit just the fingertip! A lot of climbers are scared of pockets, but with proper training, you can bolster your finger strength to help you safely and confidently conquer these holds.
          </p>
          <p className="hold-segment">How do I get better at pockets?</p>
          <p>As with <Link to="/features/crimp" className="no-format-link hold-link">crimps</Link>, pocket strength can be greatly increased with hangboarding/block hanging. Start with three fingers open handed, then progress to two fingers once your three finger hold feels strong. Be careful not to overtrain your fingers when doing this! Two times a week is more than enough.</p>
        </div>
        <div className="cell small-12 medium-4 large-4 hero-right-block overflow-block right-radius">
          {climbPane}
        </div>
      </div>
    </div>
  )
}

export default PocketPage