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
    if (field === "latitude") {
      formInput.latitude = Number(formInput.latitude)
      if (formInput[field] === 0 || isNaN(formInput[field])){
        delete formInput[field]
      }
    }
    if (field === "longitude") {
      formInput.longitude = Number(formInput.longitude)
      if (formInput[field] === 0 || isNaN(formInput[field])){
        delete formInput[field]
      }
    } 
  })

  return formInput
}

export default cleanUserInput
