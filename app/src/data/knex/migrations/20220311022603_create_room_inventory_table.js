/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('room_inventory', function(table) {
        table.increments("id").primary();
        table.integer("room_type_id").unsigned().references("id").inTable("room_types");
        table.integer("hotel_id").unsigned().references("id").inTable("hotels");
        table.dateTime("date").notNullable(),
        table.integer("total_room_count").notNullable(),
        table.integer("available_room_count").notNullable(),
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('room_inventory');
};
