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

  if(errorMessage.Name === `[ 'name', 'location' ] already in use.` && errorMessage.Location === `[ 'name', 'location' ] already in use.`) {
    return { Name: "Name and location already exist in the database!"}
  }
  return errorMessage
};

export default translateServerErrors;
