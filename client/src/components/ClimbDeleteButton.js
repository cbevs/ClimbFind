import React, { useState } from "react";
import { Redirect } from "react-router-dom";

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

  let deleteButton = <p onClick={changeButton} className="area-climb-button">Delete Climb</p>
    
  if (confirmDelete) {
    deleteButton = <>
      <p onClick={deleteClimb} className="area-climb-button delete-button">I'm sure!</p>
      <p className="confirm-delete">There may be ticks on this climb related to other users. Are you sure you want to delete this climb?</p>
    </>
  }

  return deleteButton
}

export default ClimbDeleteButton