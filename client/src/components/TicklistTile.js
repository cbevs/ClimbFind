import React from "react"
import { Link } from "react-router-dom"

const TicklistTile = ({ tick }) => {

  const date = (new Date(tick.date)).toLocaleDateString()
 
  return (
    <>
      <Link to={`/climbs/${tick.climbId}`} className="climb-link heavy">{tick.climbName}</Link>
      <p className="ticklist-date">Sent on {date}</p>
      <p>{tick.notes}</p>
    </>
  )
}

export default TicklistTile