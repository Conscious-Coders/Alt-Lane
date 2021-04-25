// could be in the kenxfile
// returns a pg promise used in server.js file

const knexfile = require('./knexfile')
const pg = require('pg-promise')()
require('dotenv').config()

// const connection = process.env.DATABASE_URL || knexfile.developement.connection

// const dbConf = {
//   "host": process.env.DB_HOST,
//   "port": 5432,
//   "database": "alt_lane",
//   "user": process.env.DB_USER,
//   "password": process.env.DB_PASS,
// }

const cn = `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:5432/alt_lane`

const ENDPOINT = process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL : cn

// const db = pg('postgres://jaejrfdnhpotvf:7d90edef3ad3231b29356ba5871b5e2ad860c2aa5b2b59794c258e95fbec6403@ec2-34-233-0-64.compute-1.amazonaws.com:5432/dg6hd7sruocvc' || cn)

const db = pg(ENDPOINT)

module.exports = db
