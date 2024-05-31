import React, { useState } from "react"
import getFeatures from "../services/getFeatures"
import climbSearchFunction from "../services/climbSearchFunction"

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
    <form className="new-climb-form" onSubmit={onSubmitHandler}>
      <label>
        What features does this climb have? Hint: Hold ctrl (pc) or cmd (mac) to
        select multiple!
        <select
          name="selectedFeatures"
          multiple={true}
          onChange={selectInputChange}
        >
          {featureOptions}
        </select>
      </label>

      <div className="button-group">
        <input className="button" type="submit" value="Submit" />
      </div>
    </form>
  )
}

export default ClimbSearch