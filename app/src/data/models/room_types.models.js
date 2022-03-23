const knex = require("../knex/knex");
const bookshelf = require("bookshelf")(knex);

const RoomTypes = bookshelf.Model.extend({
  tableName: "room_types",
  hasTimestamps: true,
});

module.exports = RoomTypes;
