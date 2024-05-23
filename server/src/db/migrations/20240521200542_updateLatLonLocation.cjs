/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.alterTable("locations", (table) => {
    table.string('latitude').alter()
    table.string('longitude').alter()
  })
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  return knex.schema.alterTable("locations", (table) => {
    table.decimal('latitude').alter()
    table.decimal('longitude').alter()
  })
};
