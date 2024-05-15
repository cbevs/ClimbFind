import React, { useState, useEffect } from "react";
import AreaTile from "./AreaTile";

const AreaList = (props) => {
  const [areas, setAreas] = useState([])

  const getAreas = async () => {
    try {
      const response = await fetch("/api/v1/areas/recents")
      if(!response.ok) {
        const newError = new Error(`${response.status} (${response.statusText})`)
        throw newError
      }
      const responseBody = await response.json()
      setAreas(responseBody.areas)
    } catch(error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getAreas()
  }, [])

  const areaArray = areas.map(area => {
    return <AreaTile key={area.id} area={area} />
  })

  return (
    <div className="show-block">
      <div className="grid-x">
        <div className="cell medium-6 large-4 hero-left-block">
          <h2 className="hero-h2">Here are the latest areas in our database!</h2>
        </div>
        <div className="cell medium-6 large-8 hero-right-block overflow-block">
          {areaArray}
        </div>
      </div>
    </div>
  )
}

export default AreaList