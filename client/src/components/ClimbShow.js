import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import getFeatures from "../services/getFeatures";

const ClimbShow = (props) => {

  const [climb, setClimb] = useState({})
  const [features, setFeatures] = useState("")
  const getClimb = async () => {
    const climbId = props.match.params.id
    try {
      const response = await fetch(`/api/v1/climbs/${climbId}`)
      if(!response.ok) {
        const newError = new Error(`${response.status} (${response.statusText})`)
        throw newError
      }
      const responseBody = await response.json()
      const formattedFeatures = getFeatures(responseBody.climb.features)
      setFeatures(formattedFeatures)
      setClimb(responseBody.climb)
    } catch(error) {
      console.error(error)
    }
  }
  
  useEffect(() => {
    getClimb()
  }, [])

  return (
    <div className="climb-show-block">
    <div className="grid-x">
      <div className="cell small-4 climb-show-left">
        <h2 className="show-h2">{climb.name}</h2>
        <Link to={`/areas/${climb.areaId}`} className="climb-link light show-a">{climb.area}</Link>
        <p className="features-p light">{features}</p>
        <p className="show-p heavy">{climb.grade}</p>
        <p className="show-p">{climb.description}</p>
        <p className="show-p">{climb.directions}</p>
      </div>
      <div className="cell small-4 climb-show-middle">
        <img src={climb.climbImage} className="climb-show-image" alt="placeholder pictures of mountains"/>
      </div>
      <div className="cell small-2 climb-show-right"></div>
    </div>
  </div>
  )
}

export default ClimbShow