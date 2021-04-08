exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id')
    table.string('first_name', 50).notNullable()
    table.string('last_name', 50).notNullable()
    table.string('email').unique().notNullable()
    table.string('password').notNullable()
    table.string('photo_url')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('users')
}

exports.up = function (knex) {
  return knex.schema.createTable('mentees', function (table) {
    table.increments('id')
    table.integer('user_id')
    table.foreign('user_id').onDelete('CASCADE').references('id').inTable('users')
    table.string('parent_name')
    table.string('parent_email')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('mentees')
}

exports.up = function (knex) {
  return knex.schema.createTable("mentors", function (table) {
    table.increments("id");
    table.integer("user_id");
    table.foreign("user_id").onDelete("CASCADE").references("id").inTable("users");
    table.string("bio");
    table.integer("career_field_id").notNullable();
    table.string("company");
    table.string("linkedin_url");

    table.foreign("career_field_id").onDelete("CASCADE").references("id").inTable("career_fields");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("mentors");
};


exports.up = function (knex) {
  return knex.schema.createTable('career_fields', function (table) {
    table.increments('id')
    table.string('name', 50).notNullable().unique() 
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('career_fields')
}


exports.up = function (knex) {
  return knex.schema.createTable('mentee_interests', function (table) {
    table.integer('mentee_id')
    table.integer('career_field_id')

    table.foreign('mentee_id').onDelete('CASCADE').references('id').inTable('mentees')
    table.foreign('career_field_id').onDelete('CASCADE').references('id').inTable('career_fields')

    table.primary(['mentee_id', 'career_field_id'])
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('mentee_interests')
}

exports.up = function (knex) {
  return knex.schema.createTable('mentorship', function (table) {
    table.integer('mentor_id')
    table.integer('mentee_id')

    table.foreign('mentor_id').onDelete('CASCADE').references('id').inTable('mentors')
    table.foreign('mentee_id').onDelete('CASCADE').references('id').inTable('mentees')

    table.primary(['mentor_id', 'mentee_id'])
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('mentorship')
}
