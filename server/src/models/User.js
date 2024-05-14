/* eslint-disable import/no-extraneous-dependencies */
const Bcrypt = require("bcrypt");
const unique = require("objection-unique");
const Model = require("./Model");

const saltRounds = 10;

const uniqueFunc = unique({
  fields: ["email", "username"],
  identifiers: ["id"],
});

class User extends uniqueFunc(Model) {
  static get tableName() {
    return "users";
  }

  set password(newPassword) {
    this.cryptedPassword = Bcrypt.hashSync(newPassword, saltRounds);
  }

  authenticate(password) {
    return Bcrypt.compareSync(password, this.cryptedPassword);
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["email", "username"],

      properties: {
        email: { type: "string", pattern: "^\\S+@\\S+\\.\\S+$" },
        username: { type: "string", minLength: 1, maxLength: 30 },
        cryptedPassword: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    const { Location, Area, Climb } = require("./index.js")
    return {
      locations: {
        relation: Model.HasManyRelation,
        modelClass: Location,
        join: {
          from: "users.id",
          to: "locations.userId"
        }
      },
      areas: {
        relation: Model.HasManyRelation,
        modelClass: Area,
        join: {
          from: "users.id",
          to: "areas.userId" 
        }
      },
      climbs: {
        relation: Model.HasManyRelation,
        modelClass: Climb,
        join: {
          from: "users.id",
          to: "climbs.userId"
        }
      }
    }
  }

  $beforeInsert() {
    return this.$checkUniqueness("email", "username");
  }

  $beforeUpdate() {
    return this.$checkUniqueness("email", "username");
  }

  

  $formatJson(json) {
    const serializedJson = super.$formatJson(json);

    if (serializedJson.cryptedPassword) {
      delete serializedJson.cryptedPassword;
    }

    return serializedJson;
  }
}

module.exports = User;
