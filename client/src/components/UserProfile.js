import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import UserTicklist from "./UserTicklist";

const UserProfile = ({ user }) => {
  const [userProfile, setUserProfile] = useState({})
  const { id } = useParams()
  let display

  const getUserProfile = async () => {
    try{
      const response = await fetch(`/api/v1/users/${id}`)
    if (!response.ok) {
      const errorMessage = `${response.status} (${response.statusText})`
      const error = new Error(errorMessage)
      throw error
    }
    const responseBody = await response.json()
    setUserProfile(responseBody.userData)
    } catch(error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getUserProfile()
  }, [])

  if (!userProfile) {
    display = <div className="grid-x no-user-error">
     <h1>No climbers live at this address <FontAwesomeIcon icon="fa-regular fa-face-sad-tear" /></h1>
     <Link to="/" className="climb-link heavy">Back to home</Link>
    </div>
  } else {
    display = <div className="show-block">
      <div className="grid-x">
      <div className="cell small-2 medium-4 large-4 hero-left-block overflow-block">
      <FontAwesomeIcon icon="fa-regular fa-hand-peace" className="large-text" />
      { user.id === userProfile.id 
        ? <h2>You're looking pretty good, {user.username}! </h2> 
          : <h2>{userProfile.username} looks pretty good, don't they?</h2> }
      <p className="climbs-sent-text">Climbs {userProfile.username} has sent</p>
      <UserTicklist user={userProfile} />
      </div>
      <div className="cell small-2 medium-4 large-4 hero-right-block overflow-block">
        <img src={userProfile.profileImage} className="profile-page-image" alt="profile-picture"></img>
      </div>
      </div>
    </div>
  }

  return <>{display}</>
}

export default UserProfile