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
    climbImage: {}
  });

  const [errors, setErrors] = useState([])
  const [imageError, setImageError] = useState({})
  const [features, setFeatures] = useState([]);
  const [hover, setHover] = useState(0);
  const featureOptions = getFeatures()
  const allowedTypes = ['image/jpeg', "image/png"]

  const handleInputChange = (event) => {
    setNewClimb({
      ...newClimb,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleProfileImageUpload = (acceptedImage) => {
    if (allowedTypes.includes(acceptedImage[0].type)) {
      setNewClimb({
        ...newClimb,
        climbImage: acceptedImage[0]
      })
      setImageError({})
    } else {
      setNewClimb({
        ...newClimb,
        climbImage: ""
      })
      setImageError({ Image: "type is invalid!"})
    }
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
      climbImage: {}
    });
    setFeatures([])
    setErrors([])
    setImageError({})
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const newClimbBody = new FormData()
    newClimbBody.append("name", newClimb.name)
    newClimbBody.append("grade", newClimb.grade)
    newClimbBody.append("rating", newClimb.rating)
    newClimbBody.append("description", newClimb.description)
    newClimbBody.append("directions", newClimb.directions)
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
        setArea({ ...area, climbs: [...area.climbs, newClimb.climb], climbCount: parseInt(area.climbCount) + 1 })
        showNewClimbForm()
      }
    } catch(error) {
      console.error(error)
    }
  }

  return (
    <>
      <FontAwesomeIcon icon="fa-solid fa-arrow-left" title="Previous Window" className="add-icon" onClick={showNewClimbForm} />
      <p className="icon-text-p">Take me back!</p>
      <form className="new-climb-form" onSubmit={onSubmitHandler}>
        <label>
          <p className="form-input-p">Climb Name:</p>
          <input
          className="new-climb-form-option"
            type="text"
            name="name"
            onChange={handleInputChange}
            value={newClimb.name}
          />
        </label>

        <label>
        <p className="form-input-p">What grade is it on the V scale?:</p>
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
          <p className="form-input-p">Rating:</p>
          <div className="star-div">{ratingStars}</div>
        </label>

        <label>
        <p className="form-input-p">Description:</p>
          <textarea
            name="description"
            onChange={handleInputChange}
            value={newClimb.description}
          />
        </label>

        <label>
        <p className="form-input-p">Directions:</p>
          <textarea
            name="directions"
            onChange={handleInputChange}
            value={newClimb.directions}
          />
        </label>

        <label>
        <p className="form-input-p">What features does this climb have? Hint: Hold ctrl (pc) or cmd (mac) to
          select multiple!</p>
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
        <ErrorList errors={imageError} />
        <div className="button-group">
          <button type="button" className="button app-button" onClick={clearForm}>
            Clear
          </button>
          <input className="button app-button" type="submit" value="Submit" />
        </div>
      </form>
    </>
  )
}

export default ClimbForm