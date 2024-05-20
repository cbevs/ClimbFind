import React from "react";
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Hero = (props) => {
 
  return (
    <div className="hero-block">
      <div className="grid-x">
        <div className="cell small-2 medium-4 large-6 hero-left-block">
          <h2 className="hero-h2">Let's find your next climb!</h2>
          <Link to="/climbs" className="to-climbs-icon">
            <FontAwesomeIcon icon="fa-solid fa-circle-arrow-right" />
          </Link>
        </div>
        <div className="cell small-2 medium-4 large-6 hero-right-block"></div>
      </div>
    </div>
  )
}

export default Hero