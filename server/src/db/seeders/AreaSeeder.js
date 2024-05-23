/* eslint-disable no-await-in-loop, no-restricted-syntax */
import { Area } from "../../models/index.js"

class AreaSeeder {
  static async seed() {
    const AreaData = [
      {
        name: "The Nears",
        description: "Hidden below the more famous Carriage Road boulders lies the Nears. While there aren't too many climbs, they make the visit worth it. Come here to escape the crowds and hop on some high quality blocs. Be sure to check out climbs The Pearl V7, Out of The Ashes (stand V3 and sit V7), and Waiting for the Messiah V7.",
        latitude: "41.735031",
        longitude: "-74.192996",
        userId: 4,
        locationId: 2
      },
      {
        name: "Carriage Road",
        description: "Lovingly referred to as The Crode to some locals, the Carriage Road is where the one can find the meat and potatoes of Gunks bouldering. It can get crowded on the road, especially because many boulders have bases near popular trad climbs. Expect a crowd, but know that there are enough boulders for everyone! Noteable climbs: Suzie A V1, The Lorax V4, New Pair of Glasses V7, Black Boulder V5 and many more!",
        longitude: "41.737187",
        latitude: "-74.187932",
        userId: 4,
        locationId: 2
      },
      {
        name: "Great Slab / Wave",
        description: "A few smallers boulders live in this area. Easy to get to from the road. There are not many tough climbs in this area, which is great for those new to the sport. Noteable climbs are Pocket Problem V3, The Wave V2, and Big Hole V3.",
        latitude: "41.8959",
        longitude: "-71.4337",
        userId: 4,
        locationId: 3
      },
      {
        name: "Pond Cave",
        description: "Near the end of the road, you'll find these boulders on the right down by the large pond. The most noteable boulder is the Pond Cave boulder, which hosts some steep overhang climbs such as Hueco Dreams V8, Buddhist V3, and Leap Frog V7. The pond area is known to flood, so don't have high hopes for getting on these boulders after a storm.",
        latitude: "41.9053",
        longitude: "-71.4356",
        userId: 4,
        locationId: 3
      },
      {
        name: "Stone Tower Area",
        description: "The Stone Tower Area has an incredible amount of boulder problems inside of it. You'll find boulders for all levels of climber. Be sure to check out the Bob Johnson Boulders, Stone Tower Boulder, and the Queen's Row.",
        latitude: "42.4899",
        longitude: "-70.98564",
        userId: 4,
        locationId: 4
      },
      {
        name: "Mt. Spickett / Goliath Rock",
        description: "Popular with first time visiitors, this area has a solid amount of climbs and offers a relatively short approach. Recommended climbs includes Reckless Freckles Face V1, The Seed V4, and Cold Steel V7.",
        latitude: "42.4962",
        longitude:  "-70.98063",
        userId: 4,
        locationId: 4
      },
      {
        name: "Gate",
        description: "The first boulders you'll encounter are at the aptly named Gate area. Not the best place to warm up, as the best climbs here start at V5. You'll want to walk up a little further to get some easier climbs in first. Make sure to check out The Origin V5 and if you're feeling up for some burly compression, The Gatekeeper V8",
        latitude: "43.193293",
        longitude: "-74.5433",
        userId: 4,
        locationId: 5
      },
      {
        name: "Wall",
        description: "The Wall area holds some of the more classic climbs at Nine Corner Lake. Here you can find one of the hardest boulders in the Adirondacks, Era of Lobotomy V12. For those who want something a tad bit easier, there are plenty of climbs in all different grade ranges. Recommended are Thorazine (stand V4 and sit V8), Spores V7, Heart Attack Man (stand V3 sit V5).",
        latitude: "43.193426",
        longitude: "-74.543337",
        userId: 4,
        locationId: 5
      },
      {
        name: "The Cave",
        description: "At The Cave you'll find some of the most unique climbs in the Adriondacks... maybe even in the Northeast! You can easily tell when you've arrived at The Cave: you'll be greeted by a huge hueco-infested nook in a boulder. Arguably one of the most unique climbs at Snowy lives here: The Sickness V5. Also check out The Hammerhead V2 and The Cure V7.",
        latitude: "43.69543",
        longitude: "-74.35048",
        userId: 4,
        locationId: 6
      }
    ]

    for (const singleAreaData of AreaData) {
      const currentArea = await Area.query().findOne({ name: singleAreaData.name })
      if(!currentArea) {
        await Area.query().insert(singleAreaData)
      }
    }
  }
}

export default AreaSeeder