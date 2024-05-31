/* eslint-disable no-await-in-loop, no-restricted-syntax */
import { Climb } from "../../models/index.js"

class ClimbSeeder {
  static async seed() {
    const climbData = [
      {
        name: "The Sickness",
        grade: "V5",
        rating: 5,
        description: "One of the most unique boulders in the area, maybe even the Adriondack Park! Start low on the right side of the cave and climb your way up and left through the cave utilizing massive heucos.",
        directions: "From the SMAC boulder, follow the path up the hill. You'll know when you see it!",
        features: "heel hooks, jugs, overhangs, mantles",
        userId: 1,
        areaId: 9
      },
      {
        name: "Suzie A",
        grade: "V1",
        description: "Start with hands on the thin horizontal holds a few feet up on the left face. Climb directly upwards. A classic!",
        features: "crimps",
        userId: 1,
        areaId: 2
      },
      {
        name: "Waiting for the Messiah",
        grade: "V7",
        description: "A classic for the Nears, start under the roof with your left hand on a compression sloper and right hand on a crimp just over the lip. Move up and right and finish as Hidden Orange.",
        features: "heel hooks, slopers",
        userId: 1,
        areaId: 1
      },
      {
        name: "The Hammerhead",
        grade: "V2",
        description: "The Hammerhead is a fun climb to the left of the Sickness. Start at the left end of the cave and fight your way through the mantle directly above.",
        features: "mantles",
        userId: 1,
        areaId: 9
      }
    ]

    for (const singleClimbData of climbData) {
      const currentClimb = await Climb.query().findOne({ name: singleClimbData.name })
      if(!currentClimb) {
        await Climb.query().insert(singleClimbData)
      }
    }
  }
}

export default ClimbSeeder