// Update with your config settings.

require('dotenv').config()
module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'alt_lane',
      user: process.env.DB_USER,
      password: process.env.DB_PASS
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

}
