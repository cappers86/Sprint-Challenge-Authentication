const knex = require('knex');
const config = require('../knexfile.js');

// which db ???????????
const environment = process.env.DB_ENV || 'development';

module.exports = knex(config[environment]);
