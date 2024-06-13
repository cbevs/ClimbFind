import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import getFeaturesList from "../services/getFeaturesList"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import TicklistForm from "./TicklistForm"
import ClimbEdit from "./ClimbEdit"
import { useParams } from "react-router-dom"

const ClimbShow = (props) => {
  const [climb, setClimb] = useState({})
  const [features, setFeatures] = useState("")
  const [showTicklist, setShowTicklist] = useState(0)
  const { id } = useParams()
  let pane
  let editButton

  const getClimb = async () => {
    try {
      const response = await fetch(`/api/v1/climbs/${id}`)
      if (!response.ok) {
        const newError = new Error(`${response.status} (${response.statusText})`)
        throw newError
      }
      const responseBody = await response.json()
      const formattedFeatures = getFeaturesList(responseBody.climb.features)
      setFeatures(formattedFeatures)
      setClimb(responseBody.climb)
    } catch (error) {
      console.error(error)
    }
  }

  const changePane = () => {
    if (showTicklist === 1) {
      setShowTicklist(0)
    } else {
      setShowTicklist(1)
    }
  }

  const changePaneEdit = () => {
    if (showTicklist === 2) {
      setShowTicklist(0)
    } else {
      setShowTicklist(2)
    }
  }

  useEffect(() => {
    getClimb()
  }, [])

  if (props.user) {
    if (props.user.id === climb.userId) {
      editButton = (
        <FontAwesomeIcon icon="fa-solid fa-pen-to-square" onClick={changePaneEdit} className="icon climb-icon" title="Edit Climb" />
      )
    }
  }

  if (showTicklist === 0 && props.user) {
    pane = (
      <>
        <h2 className="show-h2">{climb.name}</h2>
        <Link to={`/areas/${climb.areaId}`} className="climb-link medium area-link">
          {climb.area}
        </Link>
        <Link to={`/profile/${climb.userId}`} className="climb-link medium show-a">
          Added by {climb.username}
        </Link>
        <p className="features-p light">{features}</p>
        <p className="show-p heavy">{climb.grade}</p>
        <p className="show-p">{climb.description}</p>
        <p className="show-p">{climb.directions}</p>
        <div className="crud-buttons">
          <FontAwesomeIcon icon="fa-solid fa-check-double" onClick={changePane} className="icon climb-icon" title="Log Ascent" />
          {editButton}
        </div>
      </>
    )
  } else if (showTicklist === 1) {
    pane = <TicklistForm changePane={changePane} climbId={climb.id} user={props.user} />
  } else if (showTicklist === 2) {
    pane = (
      <>
        <ClimbEdit
          changePaneEdit={changePaneEdit}
          climb={climb}
          setClimb={setClimb}
          setParentFeatures={setFeatures}
        />
      </>
    )
  } else {
    pane = (
      <>
        <h2 className="show-h2">{climb.name}</h2>
        <Link to={`/areas/${climb.areaId}`} className="climb-link medium">
          {climb.area}
        </Link>
        <Link to={`/profile/${climb.userId}`} className="climb-link medium show-a">
          Added by {climb.username}
        </Link>
        <p className="features-p light">{features}</p>
        <p className="show-p heavy">{climb.grade}</p>
        <p className="show-p">{climb.description}</p>
        <p className="show-p">{climb.directions}</p>
      </>
    )
  }

  return (
    <div className="show-block">
      <div className="grid-x">
        <div className="cell small-12 medium-10 large-6 hero-left-block overflow-block ">
          {pane}
        </div>
        <div className="cell small-12 medium-10 large-4 hero-right-block clear-bg ">
          <img
            src={climb.climbImage}
            className="climb-show-image shadow"
            alt="placeholder picture of mountains"
          />
        </div>
      </div>
    </div>
  )
}

export default ClimbShow
