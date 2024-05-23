import AreaSerializer from "./AreaSerializer.js"

class LocationSerializer {

  static getLocationInfo(location) {
    const allowedAttributes = ["id", "name", "location", "description", "latitude", "longitude", "userId"]
    const serializedLocation = {}

    for (const attribute of allowedAttributes) {
      serializedLocation[attribute] = location[attribute]
    }

    return serializedLocation
  }

  static async getLocationInfoWithAreas(location) {
    const serializedLocation = LocationSerializer.getLocationInfo(location)

    const areas = await location.$relatedQuery("areas")
    serializedLocation.areas = await Promise.all(areas.map(async area => {
      return await AreaSerializer.getBasicAreaInfo(area)
    }))
    
    return serializedLocation
  }
}

export default LocationSerializer