/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('room_types', function(table) {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("description").notNullable();
        table.integer("hotel_id").unsigned().references("id").inTable("hotels");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('room_types');
};
