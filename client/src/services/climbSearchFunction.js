const climbSearchFunction = async (features) => {
  try{
    const response = await fetch("/api/v1/climbs/search", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(features)
    })
    const responseBody = await response.json()
    return responseBody.climbs
  } catch(error) {
    console.error(error)
  }
}

export default climbSearchFunction