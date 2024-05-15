import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ClimbTile from "./ClimbTile";

const AreaShow = (props) => {

  const [area, setArea] = useState({})
  let climbsArray
  const getArea = async () => {
    const areaId = props.match.params.id
    try {
      const response = await fetch(`/api/v1/areas/${areaId}`)
      if(!response.ok) {
        const newError = new Error(`${response.status} (${response.statusText})`)
        throw newError
      }
      const responseBody = await response.json()
      setArea(responseBody.areas)
    } catch(error) {
      console.error(error)
    }
  }
  
  if(Object.keys(area).length !== 0){
     climbsArray = area.climbs.map(climb => {
      return <ClimbTile key={climb.id} climb={climb} />
    })
  }
  
  useEffect(() => {
    getArea()
  }, [])

  return (
    <div className="show-block">
    <div className="grid-x">
      <div className="cell medium-6 large-4 show-left">
        <h2 className="show-h2">{area.name}</h2>
        <p className="show-p heavy">{area.climbCount} { area.climbCount === "0" || area.climbCount > 1 ? "climbs" : "climb" }</p>
        <p className="show-p">{area.description}</p>
      </div>
      <div className="cell medium-6 large-8 show-middle">
        {climbsArray}
      </div>
    </div>
  </div>
  )
}

export default AreaShow