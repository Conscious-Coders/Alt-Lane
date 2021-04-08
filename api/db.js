const knexfile = require('./knexfile')
const pg = require('pg-promise')()

const db = pg({
  host: 'localhost',
  port: 5432,
  database: 'alt_lane',
  user: '',
  password: ''
})

module.exports = db
