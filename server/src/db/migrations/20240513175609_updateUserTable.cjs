/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.alterTable("users", (table) => {
    table.string("username").notNullable().unique()
    table.string("profileImage").notNullable().defaultTo("https://climb-project-production.s3.us-east-2.amazonaws.com/blankUserImage.png")
  })
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  return knex.schema.alterTable("users", (table) => {
    table.dropColumn("username")
    table.dropColumn("profileImage")
  })
};
