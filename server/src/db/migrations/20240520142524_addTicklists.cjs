/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("ticklists", (table) => {
    table.bigIncrements("id")
    table.bigInteger("userId").notNullable().unsigned().index().references("users.id")
    table.bigInteger("climbId").notNullable().unsigned().index().references("climbs.id")
    table.text("notes")
    table.date("date").notNullable()
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
  })
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  return knex.schema.dropTableIfExists("ticklists")
};
