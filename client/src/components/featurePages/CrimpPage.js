import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import climbSearchFunction from "../../services/climbSearchFunction";
import ClimbTile from "../ClimbTile";

const CrimpPage = () => {
  const [climbs, setClimbs] = useState([])
  
  let climbPane

  const getClimbs = async () => {
    const climbs = await climbSearchFunction(["crimps"])
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
        <h2 className="hero-h2">Crimp</h2>
        <p className="hold-segment">What is a crimp?</p>
        <p>A crimp is a small edge, usually measured in finger pads (the segments for your finger). Crimps are the holds that drive fear into a climber's heart and brings pain to their fingertips. Most finger-based injuries happen due to crimps, but with a little mindful training and proper warm ups, you can turn these little razors from enemies to friends.</p>
        <p className="hold-segment">How do I get better at crimps?</p>
        <p>For a long time, new climbers were told to stay away from finger training tools such as hangboards, but new data shows that that is not actually the case. There are two common protocols for traning fingers, and both involve either hangboards or no-hangs (using a block with weights attached).</p>
        <p className="hold-segment">Max Hangs</p>
        <p>Max hangs are generally utilized to help create more strength in the fingers, which translates directly into being able to crimp better. They more resemble strength training, where you generally do less reps and more rest, but a higher weight. A standard protocol for max hangs is to hang for 10 seconds then take a 3 minute rest for 5 repetitions. Weight should be roughly 80% of your max ability to hang. If that is bodyweight for you, it's completely ok! If you need it to be lighter, either use a pulley system or a no-hang system. For heavier pulls, you can either use a block with a heavy weight to isolate the movement, or add weights to your body as you hang on a hangboard.</p>
        <p className="hold-segment">Repeaters</p>
        <p>Repeaters are more often thought of a way to build endurance in the fingers and are also a great rehab tool if your fingers are feeling a little under the weather from crimping a little too much/hard. You'll want to find a weight that doesn't cause any pain and feels like you can complete all sets. For repeaters, a good place to start is 7 seconds on, 2 seconds off for 6 reps. Do this for 4-6 sets.</p>
        </div>
        <div className="cell small-12 medium-10 large-6 hero-right-block overflow-block ">
          {climbPane}
        </div>
      </div>
    </div>
  )
}

export default CrimpPage