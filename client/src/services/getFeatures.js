const getFeatures = (featureList) => {
  if(!featureList.includes(",")){
    const formattedFeatures = `This climb features ${featureList}`
    return formattedFeatures
  } else {
    const featuresArray = featureList.split(",")
    let climbFeatures = "This climb features "
    featuresArray.splice(featuresArray.length - 1, 0, " and")
    featuresArray.forEach(feature => climbFeatures += `${feature}`)
    const formattedFeatures = climbFeatures.substring(0, climbFeatures.length)
    return formattedFeatures
  }
}

export default getFeatures