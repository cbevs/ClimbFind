import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ClimbTile from "../ClimbTile"
import climbSearchFunction from "../../services/climbSearchFunction"

const PinchPage = () => {
  const [climbs, setClimbs] = useState([])
  
  let climbPane

  const getClimbs = async () => {
    const climbs = await climbSearchFunction(["pinches"])
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
          <h2 className="hero-h2">Pinch</h2>
          <p className="hold-segment">What is a pinch?</p>
          <p>
            Pinches are probably the hold that most closely resembles exactly what they are: a hold
            that is pinched with your hand. This usually involves your four fingers on one side of
            the hold while your thumb provides compression on the opposite side. Pinches come in all
            shapes and sizes. Some are large enough to feel like jugs while others can be small
            enough that they require you to crimp with your four main fingers while squezing with
            your thumb.
          </p>
          <p className="hold-segment">How do I get better at pinches?</p>
          <ul>
            <li>
              As you'll hear many times on this site, the best way to get better at a hold is to
              climb on them more! Seek out climbs that incorporate pinches and make sure you pinch
              the pinch! Don't crimp on side of it or (on large ones) handle it like a jug/flat
              edge.
            </li>
            <li>
              Try not to oversqueeze pinches. Focus on holding on with the least possible amount of force. This may take some time to get a hang of, but will lead to you being able to exert much less energy when pinching in the future.
            </li>
            <li>
              Use pinch blocks to help you gain strength on these holds off the wall. Add close to your max weight (you may find that this fluctuates from day to day, so make sure you're squeezing hard when finding out your weight!) and aim to do repeaters of 5 seconds on, 5 seconds off for 4-6 sets.
            </li>
          </ul>
        </div>
        <div className="cell small-12 medium-10 large-6 orange-right-block overflow-block ">
          {climbPane}
        </div>
      </div>
    </div>
  )
}

export default PinchPage