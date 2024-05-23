/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("climbs", (table) => {
    table.bigIncrements("id")
    table.string("name").notNullable()
    table.string("grade").notNullable()
    table.integer("rating")
    table.text("description")
    table.text("directions")
    table.text("features")
    table.bigInteger("userId").notNullable().unsigned().index().references("users.id")
    table.bigInteger("areaId").notNullable().unsigned().index().references("areas.id")
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
  })
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  return knex.schema.dropTableIfExists("climbs")
};
