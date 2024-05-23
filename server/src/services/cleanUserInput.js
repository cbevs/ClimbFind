const cleanUserInput = (formInput) => {
 
  Object.keys(formInput).forEach((field) => {
    if (formInput[field] === "") {
      delete formInput[field]
    }
    if (field === "rating") {
      formInput.rating = parseInt(formInput.rating)
      if (formInput[field] === 0){
        delete formInput[field]
      }
    }

    if (field === "climbId") {
      formInput.climbId = parseInt(formInput.climbId)
      if (formInput[field] === 0 || isNaN(formInput[field])){
        delete formInput[field]
      }
    }

  })

  return formInput
}

export default cleanUserInput
