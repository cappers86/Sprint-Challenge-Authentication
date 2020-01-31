const knex = require('knex');

const knexConfig = require('../knexfile.js');

const knexConfig = knexConfig.development;

module.exports = knex(knexConfig.development);
