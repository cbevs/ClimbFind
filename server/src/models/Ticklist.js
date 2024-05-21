const Model = require("./Model")

class Ticklist extends Model {

  static get tableName() {
    return "ticklists"
  }

  static get jsonSchema() {
    return {
      type:"object",
      required: ["date"],
      properties: {
        notes: { type: "string" },
        date: { type: "string", format: "date" }
      }
    }
  }

  static get relationMappings() {
    const { User, Climb } = require("./index.js")
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "users.Id",
          to: "ticklists.userId"
        }
      },
      climb: {
        relation: Model.BelongsToOneRelation,
        modelClass: Climb,
        join: {
          from: "climbs.id",
          to: "ticklists.climbId"
        }
      }
    }
  }
}

module.exports = Ticklist