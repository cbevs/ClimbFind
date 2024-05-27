import { User } from "../../models/index.js"

class UserSeeder {
  static async seed() {
    const userData = [
      {
        id: 2,
        email: "admin@boulderbuddy.com",
        password: "boulderBuddy2024",
        username: "bb admin"
      }
    ]

    for (const singleUserData of userData) {
      const currentUser = await User.query().findOne({ id: singleUserData.id })
      if(!currentUser) {
        await User.query().insert(singleUserData)
      }
    }
  }
}

export default UserSeeder