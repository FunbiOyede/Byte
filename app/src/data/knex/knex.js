const environment = process.env.ENVIRONMENT || 'development'
const config = require('../../../../knexfile')[environment];
const { logger } = require("../../utils/logger")
logger.info( environment,"environment")

module.exports = require('knex')(config);