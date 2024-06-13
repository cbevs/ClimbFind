import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import climbSearchFunction from "../../services/climbSearchFunction"
import ClimbTile from "../ClimbTile";

const DynoPage = () => {
  const [climbs, setClimbs] = useState([])
  
  let climbPane

  const getClimbs = async () => {
    const climbs = await climbSearchFunction(["dynos"])
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
          <h2 className="hero-h2">Dyno</h2>
          <p className="hold-segment">What is an dyno?</p>
          <p>
            A dyno is an (often) large dynamic move that invloves at least one point of contact (a hand/foot) coming off of the wall. You'll know a dyno when you see one. You have to get from point A to point B and how are you going to do that if you're too far away to reach? You'll dyno!
          </p>
          <p className="hold-segment">How do I get better at dynos?</p>
          <p>Dynos can be tough! They combine a lot of small skills into one big one. You'll need to have good coordination, contact strength (strength to hit a hold and not fly off of it), leg strength, and persistence! Here are some tips to get better at dynos:</p>
          <ul>
            <li>
              If you are struggling with a particular dyno, see if there is a way you can try it but moving your hands or feet one hold closer  (if in the gym, this hold can be off route) to the hold to be latched. This will help you get more comfortable with the movement while having less distance to cover. Once you can do the dyno from closer holds, go back to the original holds and let it rip!
            </li>
            <li>
              Good body position is key for dynos. Make sure that you are keeping your feet as high as you can while still being able to push off of them.
            </li>
            <li>
              Make sure you are generating your power through your legs and not your arms. Explode through the feet and the body will follow.
            </li>
            <li>
              Once you're more comfortable doing dynos, try to use the least amount of force needed to get the next holds. This will help prevent you from having to engage your core too much when you hit the hold, thus minimizing your swing.
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

export default DynoPage