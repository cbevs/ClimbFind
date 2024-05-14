/* eslint-disable no-console */
import { connection } from "../boot.js";
import LocationSeeder from "./seeders/LocationSeeder.js";
import AreaSeeder from "./seeders/AreaSeeder.js";
import ClimbSeeder from "./seeders/ClimbSeeder.js"

class Seeder {
  static async seed() {
    // include individual seed commands here
    console.log("Seeding Locations...")
    await LocationSeeder.seed()
    console.log("Seeding Areas...")
    await AreaSeeder.seed()
    console.log("Seeding climbs...")
    await ClimbSeeder.seed()
    console.log("Done!");
    await connection.destroy();
  }
}

export default Seeder;
