exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments('user_id')
    table.string('first_name', 50).notNullable()
    table.string('last_name', 50).notNullable()
    table.string('email').unique().notNullable()
    table.string('password').notNullable()
    table.string('photo_url')
    table.string('user_type').notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('users')
}
