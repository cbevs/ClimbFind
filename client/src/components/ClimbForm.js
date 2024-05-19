import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import getFeatures from "../services/getFeatures";
import ErrorList from "./layout/ErrorList"
import translateServerErrors from "../services/translateServerErrors"
import Dropzone from "react-dropzone"

const ClimbForm = ({ showNewClimbForm, setArea, area, areaId }) => {
  const [newClimb, setNewClimb] = useState({
    name: "",
    grade: "",
    rating: 0,
    description: "",
    directions: "",
    latitude: "",
    longitude: "",
    climbImage: {}
  });

  const [errors, setErrors] = useState([])
  const [features, setFeatures] = useState([]);
  const [hover, setHover] = useState(0);
  const featureOptions = getFeatures()

  const handleInputChange = (event) => {
    setNewClimb({
      ...newClimb,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleProfileImageUpload = (acceptedImage) => {
    setNewClimb({
      ...newClimb,
      climbImage: acceptedImage[0]
    })
  }

  const gradesArray = [...Array(17).keys()].map((gradeNumber) => ++gradeNumber)
  const grades = gradesArray.map((grade) => {
    return <option key={grade} value={`V${grade}`}>{`V${grade}`}</option>
  })  

  const ratingStars = [...Array(5)].map((star, index) => {
    index += 1
    return (
      <button
        type="button"
        key={index}
        className={index <= (hover || newClimb.rating) ? "star-on star-button" : "star-off star-button"}
        onClick={() =>
          setNewClimb({
            ...newClimb,
            ["rating"]: index,
          })
        }
        onMouseEnter={() => setHover(index)}
        onMouseLeave={() => setHover(newClimb.rating)}
      >
        <FontAwesomeIcon key={index} icon={"fa-solid fa-star"} />
      </button>
    );
  });

  const selectInputChange = (event) => {
    const options = [...event.target.selectedOptions];
    const values = options.map((option) => option.value);
    setFeatures(values)
  };

  const clearForm = (event) => {
    event.preventDefault()
    setNewClimb({
      name: "",
      grade: "",
      rating: 0,
      description: "",
      directions: "",
      latitude: "",
      longitude: "",
      climbImage: {}
    });
    setFeatures([])
    setErrors([])
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const newClimbBody = new FormData()
    newClimbBody.append("name", newClimb.name)
    newClimbBody.append("grade", newClimb.grade)
    newClimbBody.append("rating", newClimb.rating)
    newClimbBody.append("description", newClimb.description)
    newClimbBody.append("directions", newClimb.directions)
    newClimbBody.append("latitude", newClimb.latitude)
    newClimbBody.append("longitude", newClimb.longitude)
    newClimbBody.append("features", features.join(" "))
    newClimbBody.append("climbImage", newClimb.climbImage)

    try{
      const response = await fetch(`/api/v1/areas/${areaId}/add-climb`, {
        method: "POST",
        headers: new Headers({ "Accept": "image/jpeg" }),
        body: newClimbBody
      })
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          return setErrors(newErrors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw error
        }
      } else {
        const newClimb = await response.json()
        setArea({ ...area, climbs: [...area.climbs, newClimb.climb] })
        showNewClimbForm()
      }
    } catch(error) {
      console.error(error)
    }
  }

  return (
    <>
      <p className="area-climb-button" onClick={showNewClimbForm}>Back to area details</p>
      <form className="new-climb-form" onSubmit={onSubmitHandler}>
        <label>
          Climb Name:
          <input
          className="new-climb-form-option"
            type="text"
            name="name"
            onChange={handleInputChange}
            value={newClimb.name}
          />
        </label>

        <label>
          What grade is it on the V scale?:
          <select
            name="grade"
            onChange={handleInputChange}
            value={newClimb.grade}
          > 
            <option value="">Select Grade</option>
            {grades}
          </select>
        </label>

        <label className="climb-input-left-pad">
          Rating:
          {ratingStars}
        </label>

        <label>
          Description:
          <textarea
            name="description"
            onChange={handleInputChange}
            value={newClimb.description}
          />
        </label>

        <label>
          Directions:
          <textarea
            name="directions"
            onChange={handleInputChange}
            value={newClimb.directions}
          />
        </label>

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

        <Dropzone onDrop={handleProfileImageUpload}>
          {({getRootProps, getInputProps}) => (
            <section className="climb-image">
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Upload Image</p>
              </div>
            </section>
          )}
        </Dropzone>

        {newClimb.climbImage.name ? <p>{newClimb.climbImage.name}</p> : null }
        
        <ErrorList errors={errors} />
        <div className="button-group">
          <button type="button" className="button" onClick={clearForm}>
            Clear
          </button>
          <input className="button" type="submit" value="Submit" />
        </div>
      </form>
    </>
  )
}

export default ClimbForm