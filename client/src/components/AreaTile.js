import React from "react"
import { Link } from "react-router-dom"

const AreaTile = ({ area }) => {
  return (
    <>
      <ul className="climb-tile large-text">
        <li className="climb-info-title">
          <Link to={`/areas/${area.id}`} className="climb-link heavy">{area.name}</Link>
          </li>
        <li className="climb-info-title area-small-text">
          <Link to={`/locations/${area.locationId}`} className="climb-link light">{area.locationName}</Link>
        </li>
      </ul>
      <ul className="climb-tile climb-tile-pad-left">
        <li className="menu-text">{area.climbCount} { area.climbCount === "0" || area.climbCount > 1 ? "climbs" : "climb" }</li>
      </ul>
    </>
  )
}

export default AreaTile