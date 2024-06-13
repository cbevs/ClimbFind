import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import getFeatures from "../services/getFeatures";
import getFeaturesList from "../services/getFeaturesList";
import ErrorList from "./layout/ErrorList"
import translateServerErrors from "../services/translateServerErrors"
import Dropzone from "react-dropzone"
import ClimbDeleteButton from "./ClimbDeleteButton";

const ClimbEdit = ({ changePaneEdit, climb, setClimb, setParentFeatures }) => {
 
  const [newClimb, setNewClimb] = useState({
    name: "",
    grade: "",
    rating: 0,
    description: "",
    directions: "",
    climbImage: {},
  });

  const [errors, setErrors] = useState([])
  const [features, setFeatures] = useState([]);
  const [existingFeatures, setExistingFeatures] = useState([])
  const [hover, setHover] = useState(0);
  const featureOptions = getFeatures()

  const setInitialClimb = () => {
    const attributes = ["name", "grade", "rating", "description", "directions", "climbImage"]
    const filteredClimb = {}
    for (const attribute of attributes) {
      if (climb[attribute] === null) {
        filteredClimb[attribute] = undefined
      } else {
        filteredClimb[attribute] = climb[attribute]
      }
    }
    setNewClimb(filteredClimb)
    setExistingFeatures(climb.features)
  }
  
  useEffect(() => {
    setInitialClimb()
  }, [])

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
    newClimbBody.append("climbImage", newClimb.climbImage)

    if (features.join(" ") !== existingFeatures && features.length !== 0) {
      newClimbBody.append("features", features.join(" "))
    } else {
      newClimbBody.append("features", existingFeatures)
    }

    try{
      const response = await fetch(`/api/v1/climbs/${climb.id}/edit`, {
        method: "PATCH",
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
        const responseBody = await response.json()
        const formattedFeatures = getFeaturesList(responseBody.updatedClimb.features)
        setParentFeatures(formattedFeatures)
        setClimb(responseBody.updatedClimb)
        changePaneEdit()
      }
    } catch(error) {
      console.error(error)
    }
  }

  return (
    <>
    <FontAwesomeIcon icon="fa-solid fa-arrow-left" title="Previous Pane" className="add-icon" onClick={changePaneEdit} />
      <p className="icon-text-p">Take me back!</p>

    <ClimbDeleteButton climb={climb} />
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
        <div className="button-group">
          <button type="button" className="button app-button" onClick={clearForm}>
            Clear
          </button>
          <button type="button" className="button app-button" onClick={setInitialClimb}>
            Reset
          </button>
          <input className="button app-button" type="submit" value="Submit" />
        </div>
      </form>
    </>
  )
}

export default ClimbEdit