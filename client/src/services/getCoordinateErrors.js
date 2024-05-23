const getCoordinateErrors = (latitude, longitude) => {
  const newErrors = []

  if (latitude === "") {
    newErrors.push("Latitude is required!")
  }
  if (longitude === "") {
    newErrors.push("Longitude is required!")
  }
  if (isNaN(Number(latitude))) {
    newErrors.push("Latitude must be a number!")
  }
  if (isNaN(Number(longitude))) {
    newErrors.push("Longitude must be a number!")
  }
  if (longitude === "0" ) {
    newErrors.push("Longitude cannot be zero!")
  }
  if (latitude === "0") {
    newErrors.push("Latitude cannot be zero!")
  }

  const checkLatitudeDecimals = latitude.split(".")
  if (checkLatitudeDecimals[0] <= -90 || checkLatitudeDecimals >= 90) {
    newErrors.push("Latitude should be between -90 and 90!")
  }

  const checkLongitudeDecimals = longitude.split(".")
  if (checkLongitudeDecimals[0] <= -180 || checkLongitudeDecimals >= 180) {
    newErrors.push("Latitude should be between -90 and 90!")
  }
  
  return newErrors
}

export default getCoordinateErrors