class AreaSerializer {

  static async getAreaInfo(area) {
    const allowedAttributes = ["id", "name", "description", "latitude", "longitude", "userId", "locationId"]
    const serializedArea = {}

    for (const attribute of allowedAttributes) {
      serializedArea[attribute] = area[attribute]
    }

    const areaCreatedByUser = await area.$relatedQuery("user")
    serializedArea.createdBy = areaCreatedByUser.username

    const location = await area.$relatedQuery("location")
    serializedArea.locationName = location.name

    const numberOfClimbs = await area.$relatedQuery("climbs").count()
    serializedArea.climbCount = numberOfClimbs[0].count

    return serializedArea
  }

  static async getBasicAreaInfo(area) {
    const allowedAttributes = ["id", "name"]
    const serializedArea = {}

    for (const attribute of allowedAttributes) {
      serializedArea[attribute] = area[attribute]
    }

    const climbCount = await area.$relatedQuery("climbs")
    serializedArea.climbCount = climbCount.length.toString()

    return serializedArea
  }
}

export default AreaSerializer