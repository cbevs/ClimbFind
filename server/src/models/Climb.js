const Model = require("./Model")

class Climb extends Model {

  static get tableName() {
    return "climbs"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "grade", "userId", "areaId", "features"],
      properties: {
        name: { type: "string", minLength: 1 },
        grade: { type: "string", minLength: 1, maxLength: 5 },
        rating: { type: "integer" },
        description: { type: "string", minLength: 1 },
        features: { type: "string", minLength: 1 },
        directions: { type: "string", minLength: 1 },
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
          from: "climbs.userId",
          to: "users.id"
        }
      },
      area: {
        relation: Model.BelongsToOneRelation,
        modelClass: Area,
        join: {
          from: "climbs.areaId",
          to: "areas.id"
        }
      }
    }
  }
}

module.exports = Climb