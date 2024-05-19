import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import AreaTile from "./AreaTile"
import AreaForm from "./AreaForm";

const LocationShow = (props) => {

  const [location, setLocation] = useState([])
  const [showNewAreaForm, setShowNewAreaForm] = useState(0)
  let areasArray

  const getLocation = async () => {
    const locationId = props.match.params.id
    try{
      const response = await fetch(`/api/v1/locations/${locationId}`)
      if (!response.ok) {
        const newError = new Error(`${response.status} (${response.statusText})`)
        throw newError
      }
      const responseBody = await response.json()
      setLocation(responseBody.location)
    } catch(error) {
      console.error(error)
    }
  }

  const changePane = () => {
    if (showNewAreaForm === 1) {
      setShowNewAreaForm(0)
    } else {
      setShowNewAreaForm (1)
    }
  }

  const locationPane = <>
    <h2 className="show-h2">{location.name}</h2>
    <p className="show-p">{location.location}</p>
    <p className="show-p">{location.description}</p>
    <p onClick={changePane} className="area-climb-button">Add New Area</p>
    </>

  useEffect(() => {
    getLocation()
  }, [])

  if(Object.keys(location).length !== 0){
    areasArray = location.areas.map(area => {
     return <AreaTile key={area.id} area={area} />
   })
 }

  return (
    <div className="show-block">
    <div className="grid-x">
      <div className="cell medium-6 large-4 hero-left-block overflow-block">
        <Link to="/locations" className="back-link">
          <FontAwesomeIcon icon="fa-solid fa-chevron-left" />
            Back to location list
        </Link>
        { showNewAreaForm === 0 ? locationPane : <AreaForm 
          changePane={changePane} 
          locationId={props.match.params.id}
          location={location}
          setLocation={setLocation} 
          /> 
        }
      </div>
      <div className="cell medium-6 large-8 hero-right-block overflow-block">
        {areasArray}
      </div>
    </div>
  </div>
  )
}

export default LocationShow