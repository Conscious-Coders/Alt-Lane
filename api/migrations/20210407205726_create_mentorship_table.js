
exports.up = function (knex) {
  return knex.schema.createTable('mentorship', function (table) {
    table.integer('mentor_id')
    table.integer('mentee_id')
    table.string('status')
    table.string('temp_token')

    table.foreign('mentor_id').onDelete('CASCADE').references('mentor_id').inTable('mentors')
    table.foreign('mentee_id').onDelete('CASCADE').references('mentee_id').inTable('mentees')

    table.primary(['mentor_id', 'mentee_id'])
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('mentorship')
}