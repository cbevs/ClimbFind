import React, { useState } from "react"
import TickEdit from "./TickEdit";
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TicklistTile = ({ tick, currentUserId, profileUserId, ticklist, setTicklist }) => {
  const [showEditTick, setShowEditTick] = useState(0)
  let editDeletePane
  let tickPane
  const date = (new Date(tick.date)).toLocaleDateString()

  const changePane = () => {
    if (showEditTick === 0) {
      setShowEditTick(1)
    } else {
      setShowEditTick(0)
    }
  }

  const deleteTick = async () => {
    try {
      const response = await fetch("/api/v1/users/ticklists", {
        method: "DELETE",
        headers: new Headers({ "Content-Type": "application/json"}),
        body: JSON.stringify({tickId: tick.id})
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const newTicklist = ticklist.filter((tickObject) => {
        if (tickObject.id !== tick.id) {
          return tickObject
        }
      })
      setTicklist(newTicklist)
    } catch (error) {
      console.error(error)
    }
  }

  if (currentUserId === profileUserId) {
    editDeletePane = (
      <div className="ticklist-update">
        <FontAwesomeIcon
          title="Edit"
          icon="fa-solid fa-pen-to-square" 
          className="ticklist-icon"
          onClick={changePane}
          />
        <FontAwesomeIcon 
          title="Delete"
          icon="fa-solid fa-trash" 
          className="ticklist-icon"
          onClick={deleteTick} 
        />
      </div>
    )
  }

  if (showEditTick === 0) {
    tickPane = (
      <>
        <Link to={`/climbs/${tick.climbId}`} className="climb-link heavy">
          {tick.climbName}
        </Link>
        {editDeletePane}
        <p className="ticklist-date">Sent on {date}</p>
        <p>{tick.notes}</p>
      </>
    )
  } else {
    tickPane = (
      <>
        <FontAwesomeIcon title="Minimize" icon="fa-regular fa-square-minus" className="icon" onClick={changePane}/>
        <TickEdit existingTick={tick} showEditTick={showEditTick} changePane={changePane} setTicklist={setTicklist} ticklist={ticklist}/>
      </>
    )
  }
  return tickPane
}

export default TicklistTile