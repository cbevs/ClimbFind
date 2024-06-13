import React, { useState, useEffect } from "react";
import AreaTile from "./AreaTile";

const AreaList = () => {
  const [areas, setAreas] = useState([])
  const [loaded, setLoaded] = useState("page-loading")
  const getAreas = async () => {
    try {
      const response = await fetch("/api/v1/areas/recents")
      if(!response.ok) {
        const newError = new Error(`${response.status} (${response.statusText})`)
        throw newError
      }
      const responseBody = await response.json()
      setAreas(responseBody.areas)
      setLoaded("hidden")
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
      <div className={loaded}></div>
      <div className="grid-x">
        <div className="cell small-12 medium-10 large-6 hero-left-block overflow-block ">
        <h2 className="hero-h2">Here are the latest areas in our database!</h2>
        </div>
        <div className="cell small-12 medium-10 large-6 hero-right-block overflow-block ">
          {areaArray}
        </div>
      </div>
    </div>
  )
}

export default AreaList