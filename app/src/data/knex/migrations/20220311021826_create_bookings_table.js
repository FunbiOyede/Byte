/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('bookings', function(table) {
        table.increments("id").primary();
        table.integer("user_id").unsigned().references("id").inTable("users");
        table.integer("hotel_id").unsigned().references("id").inTable("hotels");
        table.dateTime("checkin_date").notNullable();
        table.dateTime("checkout_date").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('bookings');
};
