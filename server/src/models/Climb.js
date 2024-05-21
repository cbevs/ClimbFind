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
        features: { type: "string", minLength: 1 },
      }
    }
  }

  static get relationMappings() {
    const { Area, User, Ticklist } = require("./index.js")
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
      },
      ticklists: {
        relation: Model.HasManyRelation,
        modelClass: Ticklist,
        join: {
          from: "climbs.id",
          to: "ticklists.climbId"
        }
      }
    }
  }
}

module.exports = Climb