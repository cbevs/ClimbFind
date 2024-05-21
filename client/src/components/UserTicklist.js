import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import TicklistTile from "./TicklistTile";
import { Link } from "react-router-dom";

const UserTicklist = ({ user }) => {

  const [ticklist, setTicklist] = useState([])
  const { id } = useParams()

  const getTicklist = async () => {
    try {
      const response = await fetch(`/api/v1/users/ticklists/${id}`)
      if (!response.ok) {
        const newError = new Error(`${response.status} (${response.statusText})`)
        throw newError
      }
      const responseBody = await response.json()
      setTicklist(responseBody.ticklist)
    } catch(error) {
      console.error(error)
    }
  }

  const tickListArray = ticklist.map(tick => {
    return <TicklistTile key={tick.id} tick={tick} />
  })

  useEffect(() => {
    getTicklist()
  }, [])

  return (
    <>
      { tickListArray.length !== 0
        ? tickListArray
        : <p>This user hasn't logged any climbs!</p> }
    </>
  )
}

export default UserTicklist