import React from "react";
import { Link } from "react-router-dom";

const LocationTile = ( {location} ) => {

  return (
    <>
      <ul className="climb-tile">
        <li>
          <Link to={`/locations/${location.id}`} className="climb-link heavy">
            {location.name}
          </Link>
        </li>
        <li>
          {location.location}
        </li>
      </ul>
      <hr className="hr-hidden"/>
    </>
  )
}

export default LocationTile