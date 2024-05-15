import React from "react";
import { Link } from "react-router-dom";

import SignOutButton from "../authentication/SignOutButton";

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li key="sign-in">
      <Link to="/user-sessions/new" className="top-bar-menu">Sign In</Link>
    </li>,
    <li key="sign-up">
      <Link to="/users/new" className="button top-bar-menu">
        Sign Up
      </Link>
    </li>,
  ];

  const authenticatedListItems = [
    user ? <li key="profile-image"><img src={user.profileImage} className="user-image"></img></li> : null,
    <li key="sign-out">
      <SignOutButton />
    </li>
  ];

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <ul className="menu">
          <li className="menu-text app-name">Boulder Buddy</li>
          <li>
            <Link to="/" className="top-bar-menu">Home</Link>
          </li>
          <li>
            <Link to="/climbs" className="top-bar-menu">Climbs</Link>
          </li>
          <li>
            <Link to="/areas" className="top-bar-menu">Areas</Link>
          </li>
        </ul>
      </div>
      <div className="top-bar-right">
        <ul className="menu">{user ? authenticatedListItems : unauthenticatedListItems}</ul>
      </div>
    </div>
  );
};

export default TopBar;
