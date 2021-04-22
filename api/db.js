// could be in the kenxfile 
// returns a pg promise used in server.js file 

const knexfile = require('./knexfile')
const pg = require('pg-promise')()
require('dotenv').config()

// const connection = process.env.DATABASE_URL || knexfile.developement.connection

const environment = process.env.NODE_ENV || 'development';
const config = require('./knexfile.js')[environment];
console.log('config: ', config);

// const db = pg({
//   "host": process.env.DB_HOST,
//   "port": 5432,
//   "database": "alt_lane",
//   "user": process.env.DB_USER,
//   "password": process.env.DB_PASS,
// })

const db = require('knex')(config)

module.exports = db;
