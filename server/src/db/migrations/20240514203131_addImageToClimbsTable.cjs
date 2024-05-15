/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.alterTable("climbs", (table) => {
    table.string("climbImage").defaultTo("https://climb-project-production.s3.us-east-2.amazonaws.com/climbImageDefault.svg")
  })
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  return knex.schema.alterTable("climbs", (table) => {
    table.dropColumn("climbImage")
  })
};
