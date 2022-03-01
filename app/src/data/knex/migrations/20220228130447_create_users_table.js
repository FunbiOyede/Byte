/**
 * @param { import("knex").Knex } knex
 */
 exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
        table.increments("id").primary();
        table.string("username").notNullable();
        table.string("email").notNullable();
        table.string("password").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      })
};

/**
 * @param { import("knex").Knex } knex
 */
exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
