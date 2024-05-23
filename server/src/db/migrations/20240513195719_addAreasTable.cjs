/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("areas", (table) => {
    table.bigIncrements("id")
    table.string("name").notNullable()
    table.text("description")
    table.string("latitude")
    table.string("longitude")
    table.bigInteger("userId").notNullable().unsigned().index().references("users.id")
    table.bigInteger("locationId").notNullable().unsigned().index().references("locations.id")
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
  })
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  return knex.schema.dropTableIfExists("areas")
};
