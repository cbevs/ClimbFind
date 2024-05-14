/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("locations", (table) => {
    table.bigIncrements("id")
    table.string("name").notNullable()
    table.string("location").notNullable()
    table.text("description")
    table.decimal("latitude")
    table.decimal("longitude")
    table.bigInteger("userId").notNullable().unsigned().index().references("users.id")
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
  })
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  return knex.schema.dropTableIfExists("locations")
};
