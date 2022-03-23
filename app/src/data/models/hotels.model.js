const knex = require("../knex/knex");
const bookshelf = require("bookshelf")(knex);

const Hotels = bookshelf.Model.extend({
  tableName: "hotels",
  hasTimestamps: true,
});

module.exports = Hotels;
