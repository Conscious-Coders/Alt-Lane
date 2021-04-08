const mentors_data = require('../seed_data/mentors')

exports.seed = function(knex) {
  return knex('mentors').del()
    .then(function () {
      return knex('mentors').insert(mentors_data);
    });
};
