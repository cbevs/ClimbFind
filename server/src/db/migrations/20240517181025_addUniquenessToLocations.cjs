/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.alterTable("locations", (table) => {
    table.unique(["name", "location"])
  })
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  return knex.schema.alterTable("locations", (table) => {
    table.dropUnique(["name", "location"])
  })
};
