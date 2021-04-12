
exports.up = function (knex) {
  return knex.schema.createTable('mentee_interests', function (table) {
    table.integer('mentee_id')
    table.integer('career_field_id')

    table.foreign('mentee_id').onDelete('CASCADE').references('mentee_id').inTable('mentees')
    table.foreign('career_field_id').onDelete('CASCADE').references('id').inTable('career_fields')

    table.primary(['mentee_id', 'career_field_id'])
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('mentee_interests')
}