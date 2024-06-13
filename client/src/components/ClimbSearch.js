import React, { useState } from "react"
import getFeatures from "../services/getFeatures"
import climbSearchFunction from "../services/climbSearchFunction"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ClimbSearch = ({ setClimbs }) => {

  const [features, setFeatures] = useState([])
  const featureOptions = getFeatures()

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const climbData = await climbSearchFunction(features)
    setClimbs(climbData)
  }

  const selectInputChange = (event) => {
    const options = [...event.target.selectedOptions]
    const values = options.map((option) => option.value)
    setFeatures(values)
  }

  return (
    <form className="climb-select" onSubmit={onSubmitHandler}>
      <label>
        <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" className="search-icon" />
        <p className="form-input-p search-p">Search for a climb</p>
        <p className="form-input-p">What features does this climb have? Hint: Hold ctrl (pc) or cmd (mac) to
        select multiple!</p>
        <select
          className="climb-select"
          name="selectedFeatures"
          multiple={true}
          onChange={selectInputChange}
        >
          {featureOptions}
        </select>
      </label>

      <div className="button-group">
        <input className="button app-button" type="submit" value="Submit" />
      </div>
    </form>
  )
}

export default ClimbSearch