const knex = require("../knex/knex");
const bookshelf = require("bookshelf")(knex);

const RoomInventory = bookshelf.Model.extend({
  tableName: "room_inventory",
  hasTimestamps: true,
});

module.exports = RoomInventory;
