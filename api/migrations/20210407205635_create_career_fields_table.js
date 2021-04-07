exports.up = function (knex) {
  return knex.schema.createTable('career_fields', function (table) {
    table.increments('id')
    table.string('name', 50).notNullable().unique() 
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('career_fields')
}
