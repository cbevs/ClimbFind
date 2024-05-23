const getFeaturesList = (featureList) => {
    const featuresArray = featureList.split(" ")
    if (featuresArray.length === 1) {
      const formattedFeatures = `This climb features ${featureList}`
      return formattedFeatures
    } else {
      let climbFeatures = "This climb features "
      featuresArray.splice(featuresArray.length - 1, 0, " and ")
      featuresArray.forEach(feature => climbFeatures += `${feature} `)
      const formattedFeatures = climbFeatures.substring(0, climbFeatures.length)
      return formattedFeatures
  }
}

export default getFeaturesList