
exports.up = function(knex) {
    return knex.schema.createTable('mentors', function(table){
        table.increments("id");
        table.integer('user_id');
        table.foreign('user_id').onDelete('CASCADE').references('id').inTable('users');
        table.string('bio');
        table.integer('career_field_id').notNullable();
        table.string('company');
        table.string('linkedin_url')
    
        table.foreign('career_field_id').onDelete('CASCADE').references('id').inTable('career_fields');
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('mentors');
};
