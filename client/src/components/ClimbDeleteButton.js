import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ClimbDeleteButton = ({ climb }) => {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const changeButton = () => {
    setConfirmDelete(true)
  }

  const deleteClimb = async () => {
    try {
      const response = await fetch(`/api/v1/climbs/${climb.id}`, {
        method: "DELETE",
        headers: new Headers({ "Content-Type": "application/json" })
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      setShouldRedirect(true)
    } catch(error) {
      console.error(error)
    }
  }

  if (shouldRedirect) {
    return <Redirect push to={`/areas/${climb.areaId}`} />
  }

  let deleteButton = (
    <>
      <FontAwesomeIcon
        icon="fa-solid fa-trash"
        title="Delete Climb"
        className="delete-icon add-icon"
        onClick={changeButton}
      />
      <p className="icon-text-p">Delete Climb</p>
    </>
  )
    
  if (confirmDelete) {
    deleteButton = <>
    <FontAwesomeIcon
        icon="fa-solid fa-trash"
        title="Delete Climb"
        className="delete-icon add-icon delete-button"
        onClick={deleteClimb}
      />
      <p className="icon-text-p">I'm sure!</p>
      <div>
      <FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" className="hazard-icon" />
      <p className="confirm-delete">There may be ticks on this climb related to other users. Are you sure you want to delete this climb?</p>
      </div>
    </>
  }

  return deleteButton
}

export default ClimbDeleteButton