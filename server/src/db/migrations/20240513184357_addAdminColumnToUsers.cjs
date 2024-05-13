/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.alterTable("users", (table) => {
    table.boolean("admin").notNullable().defaultTo(false)
  })
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  return knex.schema.alterTable("users", (table) => {
    table.dropColumn("admin")
  })
};
