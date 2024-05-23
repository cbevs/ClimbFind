const cleanEditedUserInput = (formInput) => {
 
  Object.keys(formInput).forEach((field) => {

    if (field === "rating") {
      formInput.rating = parseInt(formInput.rating)
      if (formInput[field] === 0 || isNaN(formInput.rating)){
        delete formInput[field]
      }
    }
    
    if (field === "climbId") {
      formInput.climbId = parseInt(formInput.climbId)
      if (formInput[field] === 0 || isNaN(formInput[field])){
        delete formInput[field]
      }
    }
    
    if(formInput[field] === "undefined") {
      formInput[field] = null
    }

    if (formInput[field] === "") {
      formInput[field] = null
    }
  })

  return formInput
}

export default cleanEditedUserInput
