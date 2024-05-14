const Model = require("./Model")

class Area extends Model {
  static get tableName() {
    return "areas"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "userId", "locationId"],
      properties: {
        name: { type: "string", minLength: 1},
        latitude: { type: "number" },
        longitude: { type: "number" }
      }
    }
  }
  
  static get relationMappings() {
    const { Location, User, Climb } = require("./index.js")
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "areas.userId",
          to: "user.id"
        }
      },
      location: {
        relation: Model.BelongsToOneRelation,
        modelClass: Location,
        join: {
          from: "areas.locationId",
          to: "locations.id"
        }
      },
      climbs: {
        relation: Model.HasManyRelation,
        modelClass: Climb,
        join: {
          from: "areas.id",
          to: "climbs.areaId"
        }
      }
    }
  }
}

module.exports = Area