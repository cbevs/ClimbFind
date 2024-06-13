import _ from "lodash";

const translateServerErrors = (errors) => {
  const errorMessage = Object.keys(errors).reduce((serializedErrors, key) => {
    const field = _.startCase(key);
    const message = errors[key][0].message;
    return {
      ...serializedErrors,
      [field]: message,
    };
  }, {});

  if (errorMessage.Name === "must have required property 'name'") {
    errorMessage.Name = " is required!"
  }
  if (errorMessage.Location === "must have required property 'location'") {
    errorMessage.Location = " is required!"
  }

  if (errorMessage.Grade === "must NOT have fewer than 1 characters") {
    errorMessage.Grade = " is required!"
  }

  if (errorMessage.Grade === "must have required property 'grade'") {
    errorMessage.Grade = " is required!"
  }

  if (errorMessage.Features === "must have required property 'features'") {
    errorMessage.Features = " is required!"
  }

  if (errorMessage.Date === "must have required property 'date'") {
    errorMessage.Date = " is required!"
  }

  if (errorMessage.Name === `[ 'name', 'location' ] already in use.` && errorMessage.Location === `[ 'name', 'location' ] already in use.`) {
    return { Name: "Name and location already exist in the database!"}
  }
  return errorMessage
};

export default translateServerErrors;
