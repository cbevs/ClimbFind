import React from "react";
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HeroImage from "./HeroImage";

const Hero = (props) => {
 
  return (
    <div className="hero-block">
      <div className="grid-x">
        <div className="cell small-12 medium-10 large-6 hero-left-block ">
          <h2 className="hero-h2">Let's find your next climb!</h2>
          <div className="hero-icon-container">
          <Link to="/climbs" className="to-climbs-icon">
            <FontAwesomeIcon icon="fa-solid fa-circle-arrow-right" />
          </Link>
          </div>
        </div>
        <div className="cell small-12 medium-10 large-4 hero-right-block ">
          <HeroImage />
        </div>
      </div>
    </div>
  )
}

export default Hero