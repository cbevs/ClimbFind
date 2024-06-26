import React, { useState } from "react";
import { Link } from "react-router-dom";
import config from "../../config";
import ForgotPassword from "./ForgotPassword";
import FormError from "../layout/FormError";

const SignInForm = () => {
  const [userPayload, setUserPayload] = useState({ email: "", password: "" });
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [errors, setErrors] = useState({});
  const [credentialsErrors, setCredentialsErrors] = useState("");

  const validateInput = (payload) => {
    setErrors({});
    setCredentialsErrors("");
    const { email, password } = payload;
    const emailRegexp = config.validation.email.regexp.emailRegex;
    let newErrors = {};
    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: "is invalid",
      };
    }

    if (password.trim() === "") {
      newErrors = {
        ...newErrors,
        password: "is required",
      };
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      return true;
    }
    return false;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (validateInput(userPayload)) {
      try {
        const response = await fetch("/api/v1/user-sessions", {
          method: "POST",
          body: JSON.stringify(userPayload),
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        });
        if (!response.ok) {
          if (response.status === 401) {
            const body = await response.json();
            return setCredentialsErrors(body.message);
          }
          const errorMessage = `${response.status} (${response.statusText})`;
          const error = new Error(errorMessage);
          throw error;
        }
        const userData = await response.json();
        setShouldRedirect(true);
      } catch (err) {
        console.error(`Error in fetch: ${err.message}`);
      }
    }
  };

  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  if (shouldRedirect) {
    location.href = "/";
  }

  return (
    <div className="grid-container" onSubmit={onSubmit}>
      <h1 className="form-h1">Sign In</h1>

      {credentialsErrors ? <p className="callout alert">{credentialsErrors}</p> : null}

      <form className="register-form">
        <div>
          <label>
            <p className="form-input-p">Email</p>
            <input className="form-round" type="text" name="email" value={userPayload.email} onChange={onInputChange} />
            <FormError error={errors.email} />
          </label>
        </div>
        <div>
          <label>
          <p className="form-input-p">Password</p>
            <input
              className="form-round"
              type="password"
              name="password"
              value={userPayload.password}
              onChange={onInputChange}
            />
            <FormError error={errors.password} />
          </label>
        </div>
        <div>
          <input type="submit" className="button app-button" value="Sign In" />
        </div>
      </form>
      <Link to="/users/new" className="no-format-link">Don't have an account? Click here to sign up!</Link>
      <Link to="/users/forgot-password" className="no-format-link forgot-password-link">Forgot Password?</Link>
    </div>
  );
};

export default SignInForm;
