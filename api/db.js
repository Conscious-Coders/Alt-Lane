// could be in the kenxfile
// returns a pg promise used in server.js file

const knexfile = require('./knexfile')
const pg = require('pg-promise')()
require('dotenv').config()

const cn = `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:5432/alt_lane`

const ENDPOINT = process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL : cn

const db = pg(ENDPOINT)

module.exports = db
