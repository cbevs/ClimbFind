import React, { useState } from "react"
import getFeatures from "../services/getFeatures"

const ClimbSearch = ({ setClimbs }) => {

  const [features, setFeatures] = useState([])
  const featureOptions = getFeatures()

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try{
      const response = await fetch("/api/v1/climbs/search", {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify(features)
      })
      const responseBody = await response.json()
      setClimbs(responseBody.climbs)
    } catch(error) {
      console.error(error)
    }
  }

  const selectInputChange = (event) => {
    const options = [...event.target.selectedOptions];
    const values = options.map((option) => option.value);
    setFeatures(values)
  };

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