/* eslint-disable no-await-in-loop, no-restricted-syntax */
import { Location } from "../../models/index.js"

class LocationSeeder {
  static async seed() {
    const locationData = [
      {
        name: "The Shawangunks",
        location: "New Paltz, NY",
        description: "The Gunks is one of the most well renowned climbing areas in the United States. Known mainly for it's trad climbing, the Gunks also hosts a large swath of boulders in a few different areas. The rock type is mainly quartz conglomerate and can be harsh on the skin. The best time to climb at the Gunks is in the Fall and Winter.",
        latitude: "41.74442",
        longitude: "-74.19717",
        userId: 1
      },
      {
        name: "Lincoln Woods",
        location: "Lincoln, RI",
        description: "Being just a few miles north of Providence and an hour drive away from Boston, Lincoln Woods is the perfect bouldering spot for urban climbing enthusiasts. The sharp granite leads to trying hard on solid crimps and the ocassional dynamic move. The best time to climb at Lincoln Woods is Fall into late Winter.",
        latitude: "41.89742",
        longitude: "-71.4339",
        userId: 1
      },
      {
        name: "Lynn Woods",
        location: "Lynn, MA",
        description: "Lynn Woods is an urban climbers dream: high quality boulders within 10 miles from the city (that city being Boston in this case). There are 2200 acres of forest here that are strewn with glacial erratic boulders. Primarily a bouldering destination, Lynn Woods has grown over the past decade to have a number of established climbs to rival Lincoln Woods and Pawtuckaway.",
        latitude: "42.48946",
        longitude: "-70.99196",
        userId: 1
      },
      {
        name: "Nine Corner Lake",
        location: "Caroga Lake, NY",
        description: "All hail the mighty boulders of Nine Corner Lake! Housing some of the toughest problems in the Adirondack Park, Nine Corner Lake is a place where climbers can come to give their all. Thankfully for mere mortals, there are plenty of easier climbs to be had! Rock quality can be described as immaculate, and get ready to keep your cool on some sketchy topouts.",
        latitude: "43.19439",
        longitude: "-74.54234",
        userId: 1
      },
      {
        name: "Snowy Mountain",
        location: "Indian Lake, NY",
        description: "Hidden in the woods of Upstate NY lie the glacial erratic boulders of Snowy Mountain. While the boulder field is relatively small, Snowy has some of the highest quality climbs in the Adrinondacks. The rock at Snowy is unique to it's location: abundant and sometimes massive huecos and tough compression moves. The huecos lead to there being many high quality easier problems. Noteable climbs include: SMAC V7, IHOP V6, and Salamander Slayer V11",
        latitude: "43.69363",
        longitude: "-74.34155",
        userId: 1
      },
      {
        name: "Smugglers Notch",
        location: "Stowe, VT",
        description: "Nestled in between two massive cliffs, Smugglers Notch provides some of the best boulders in New England. Despite being known mainly for it's ice climbing, Smuggs (as called by the locals) draws quite the crowd of boulderers. Expect to share the climbs with others. The rock is mica-albite-quartz schist, which in short, means sharp edges and low friction. Your fingers will get shredded. Smuggs should be on any climbers bucket list. Not only are the boulders incredible, but so is the surrounding area. Be sure to check out Stowe and downtown Burlington!",
        latitude: "44.55625",
        longitude: "-72.79424",
        userId: 1
      },
      {
        name: "Chattanooga",
        location: "Greater Chattanooga Area, TN",
        description: "The Chattanooga Area of Tennessee holds a lifetime amount of climbing. One could stay here their whole life and still not complete all of the climbs this location has to offer. The most famous area here by far is Stone Fort (AKA Little Rock City). The sandstone here leaves nothing to be desired. It gives and it takes away. One day you'll climb V10 and the next you'll be sliding off of a V2 sloper problem. Get your sloper game ready for the south!",
        latitude: "35.0458",
        longitude: "-85.3094",
        userId: 1
      }
    ]
 
    for (const singleLocationData of locationData) {
      const currentLocation = await Location.query().findOne({ name: singleLocationData.name })
      if(!currentLocation) {
        await Location.query().insert(singleLocationData)
      }
    }
  }
}

export default LocationSeeder