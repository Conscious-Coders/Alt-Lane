exports.up = function (knex) {
  return knex.schema.createTable('mentees', function (table) {
    table.integer('mentee_id').unique()
    table.foreign('mentee_id').onDelete('CASCADE').references('user_id').inTable('users')
    table.string('parent_name')
    table.string('parent_email')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('mentees')
}