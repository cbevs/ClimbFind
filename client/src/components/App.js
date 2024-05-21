import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import "../assets/scss/main.scss";

import getCurrentUser from "../services/getCurrentUser";

import RegistrationForm from "./registration/RegistrationForm";
import AuthenticatedRoute from "./authentication/AuthenticatedRoute"
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import Hero from "./Hero";
import BottomBar from "./layout/BottomBar";
import ClimbList from "./ClimbList";
import ClimbShow from "./ClimbShow";
import AreaShow from "./AreaShow";
import AreaList from "./AreaList";
import LocationList from "./LocationList";
import LocationShow from "./LocationShow";
import UserProfile from "./UserProfile";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser();
      setCurrentUser(user);
    } catch (err) {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/" component={Hero} />
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <Route exact path="/climbs" component={ClimbList} />
        <Route exact path="/climbs/:id">
          <ClimbShow user={currentUser} />
        </Route>
        <Route exact path="/areas" component={AreaList} />
        <Route exact path="/areas/:id" component={AreaShow} />
        <Route exact path="/locations" component={LocationList} />
        <Route exact path="/locations/:id" component={LocationShow} />
        <AuthenticatedRoute exact path="/profile/:id" component={UserProfile} user={currentUser} />
      </Switch>
      <BottomBar />
    </Router>
  );
};

export default hot(App);
