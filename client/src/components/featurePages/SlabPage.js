import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ClimbTile from "../ClimbTile"
import climbSearchFunction from "../../services/climbSearchFunction"

const SlabPage = () => {
  const [climbs, setClimbs] = useState([])
  
  let climbPane

  const getClimbs = async () => {
    const climbs = await climbSearchFunction(["slab"])
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
          <h2 className="hero-h2">Slab</h2>
          <p className="hold-segment">What is an slab?</p>
          <p>
            The opposite of an <Link to="/features/overhang" className="no-format-link hold-link">overhang</Link>, slab is a wall that is more than 90 degrees. Slabs range from relatively easy with big feet that allow you to take both hands off the wall to rest, to world-cup levels of hard that even the most professional of climbers struggle to conquer. 
          </p>
          <p className="hold-segment">How do I get better at slab?</p>
          <p>Slab climbing is where your feet and balance do most of the work. To get better at slab, you'll need strong feet (hint, climb more slab!) and a good sense of on-wall body awareness. Some other helpful tips:</p>
          <ul>
            <li>
              Keep your heels down! This helps put more pressure on your toes which in turn means more friction between your shoe and the foothold.
            </li>
            <li>
              Trust your feet when on slab. Try to convince yourself that one you have your foot placed, it will not slip. A bit of a committed mindset goes a long way here!
            </li>
            <li>
              On slabs, you'll want to try to keep your hips farther out from the wall, which helps you apply more pressure onto your feet.
            </li>
            <li>
              Try to keep your feet higher and not to let yourself get fully maxed out length-wise. 
            </li>
            <li>
              Work on your mobility/flexibilty to help your lower body get onto possibly higher/better foot holds while on slab climbs.
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

export default SlabPage