import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ClimbTile = ({ climb }) => {
  
  const stars = [1,2,3,4,5].map(starNumber => {
    let starStyle = "fa-regular fa-star"
    if (climb.rating >= starNumber) {
      starStyle = "fa-solid fa-star"
    }
    return <FontAwesomeIcon key={starNumber} icon={starStyle} />
  })

  return (
    <>
      <ul className="climb-tile large-text">
        <li className="climb-info-title">
          <Link to={`/climbs/${climb.id}`} className="climb-link heavy">{climb.name}</Link>
          </li>
        <li className="climb-info-title area-small-text">
          <Link to={`/areas/${climb.areaId}`} className="climb-link light">{climb.area}</Link>
        </li>
      </ul>
      <ul className="climb-tile climb-tile-pad-left">
        <li className="menu-text">{climb.grade}</li>
        { climb.rating ? <li className="menu-text">{stars}</li> : <li>No rating</li> }
      </ul>
      <hr className="hr-hidden"/>
    </>
  )
}

export default ClimbTile