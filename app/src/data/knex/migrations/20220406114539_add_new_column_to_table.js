/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('bookings', table => {
        table.integer('room_type_id').unsigned().references("id").inTable("room_types");;
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table('bookings', table => {
        table.dropColumn('room_type_id');
      })
};
