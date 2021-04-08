const career_fields_data = require('../seed_data/career_fields')


exports.seed = function(knex) {
  return knex('career_fields').del()
    .then(function () {
      return knex('career_fields').insert(career_fields_data);
    });
};
