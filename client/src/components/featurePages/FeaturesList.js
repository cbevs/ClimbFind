import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash"

const FeaturesList = () => {
  const featuresArray = ["crimp", "sloper", "jug", "pinch", "pocket", "undercling", "side-pull", "gaston", "heel-hook", "toe-hook", "mantle", "slab", "overhang", "dyno"]
  
  const featuresLinks = featuresArray.map((feature, index) => {

    return (
        <li key={index}>
          <Link to={`/features/${feature}`} className="climb-link heavy">{`${_.startCase(feature)}`}</Link>
          <hr className="hr-hidden" />
        </li>
    )
  })

  return (
    <div className="show-block">
      <div className="grid-x">
        <div className="cell small-12 medium-4 large-4 hero-left-block overflow-block left-radius">
          <Link to="/" className="back-link">
            <FontAwesomeIcon icon="fa-solid fa-chevron-left" />
            Back to homepage
          </Link>
          <h2 className="hero-h2">Features</h2>
          <p>Here is a list of all of the features Boulder Buddy keeps track of. Click on a feature to see detailed information about it and to get a list of climbs that have those features.</p>
        </div>
        <div className="cell small-12 medium-4 large-4 hero-right-block overflow-block right-radius">
          <ul className="features-list">
            {featuresLinks}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default FeaturesList