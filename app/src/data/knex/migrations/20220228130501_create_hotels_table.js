
exports.up = function(knex) {
    return knex.schema.createTable('hotels', function(table) {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("address").notNullable();
        table.string("description").notNullable();
        table.string("amenities").notNullable();
        table.double("price_per_night").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('hotels');
};