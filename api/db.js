// could be in the kenxfile 
// returns a pg promise used in server.js file 

const pg = require('pg-promise')()

const db = pg({
  "host": process.env.DB_HOST,
  "port": 5432,
  "database": "alt_lane",
  "user": process.env.DB_USER
})

module.exports = db;
