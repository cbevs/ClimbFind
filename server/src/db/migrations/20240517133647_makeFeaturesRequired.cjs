/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.alterTable("climbs", (table) => {
    table.text("features").alter().notNullable()
  })
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  return knex.schema.alterTable("climbs", (table) => {
    table.text("features").alter()
  })
};
