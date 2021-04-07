
exports.up = function(knex) {
    return knex.schema.createTable('mentees', function(table){
        table.increments("id");
        table.integer('user_id');
        table.foreign('user_id').onDelete('CASCADE').references('id').inTable('users');
        table.string('parent_name');
        table.string('parent_email');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('mentees');
};
