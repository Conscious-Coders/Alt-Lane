const knexfile = require('./knexfile')

const pg = require('pg-promise')()

const db = pg({
  "host": process.env.DB_HOST,
  "port": 5432,
  "database": "sleep_tracker",
  "user": process.env.DB_USER,
  "password": process.env.DB_PASS
})

module.exports = db;