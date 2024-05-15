class ClimbSerializer {

  static async getClimbInfo(climb) {
    const allowedAttributes = ["id", "name", "grade", "rating", "description", "directions", "features", "userId", "areaId", "climbImage"]
    const serializedClimb = {}

    for (const attribute of allowedAttributes) {
      serializedClimb[attribute] = climb[attribute]
    }

    const area = await climb.$relatedQuery("area")
    serializedClimb.area = area.name
    return serializedClimb
  }
}

export default ClimbSerializer