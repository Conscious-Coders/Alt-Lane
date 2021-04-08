const mentee_interests_data = require('../seed_data/mentee_interests')

exports.seed = function(knex) {
  return knex('mentee_interests').del()
    .then(function () {
      return knex('mentee_interests').insert(mentee_interests_data);
    });
};
