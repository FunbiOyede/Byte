const knex = require("../knex/knex");
const bookshelf = require("bookshelf")(knex);

const Booking = bookshelf.Model.extend({
  tableName: "bookings",
  hasTimestamps: true,
});

module.exports = Booking;
