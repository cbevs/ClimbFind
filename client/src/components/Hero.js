import React, { useRef, useEffect} from "react";
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import getHeroImage from "../services/getHeroImage";

const Hero = () => {
  
  const refImage = useRef(getHeroImage())

  const imagePane = (
    <div className="front-page-image-container">
      <img
        className="front-page-image"
        src={refImage.current.url}
        alt={refImage.current.name}
      ></img>
      <p className="hero-image-text">{refImage.current.name}</p>
    </div>
  )
  
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
          {imagePane}
        </div>
      </div>
    </div>
  )
}

export default Hero