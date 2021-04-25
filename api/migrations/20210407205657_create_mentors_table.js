exports.up = function (knex) {
  return knex.schema.createTable('mentors', function (table) {
    table.integer('mentor_id').unique()
    table.foreign('mentor_id').onDelete('CASCADE').references('user_id').inTable('users')
    table.string('bio')
    table.integer('career_field_id').notNullable()
    table.string('company')
    table.string('linkedin_url')

    table.foreign('career_field_id').onDelete('CASCADE').references('id').inTable('career_fields')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('mentors')
}
