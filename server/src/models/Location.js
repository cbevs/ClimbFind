const Model = require("./Model")

class Location extends Model {
  static get tableName() {
    return "locations"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "location"],
      properties: {
        name: { type: "string" },
        location: { type: "string" },
        latitude: { type: "number" },
        longitude: { type: "number" }
      }
    }
  }

  static get relationMappings() {
    const { Area, User } = require("./index.js")
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "locations.userId",
          to: "users.id"
        }
      },
      areas: {
        relation: Model.HasManyRelation,
        modelClass: Area,
        join: {
          from: "locations.id",
          to: "areas.locationId"
        }
      }
    }
  }
}

module.exports = Location