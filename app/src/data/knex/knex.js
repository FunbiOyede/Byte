const environment = process.env.ENVIRONMENT || 'development'
const config = require('../../../../knexfile')[environment];
console.log( environment,"checking environment")
module.exports = require('knex')(config);