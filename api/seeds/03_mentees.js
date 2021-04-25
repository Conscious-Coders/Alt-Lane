const mentees_data = require('../seed_data/mentees')

exports.seed = function (knex) {
  return knex('mentees').del()
    .then(function () {
      return knex('mentees').insert(mentees_data)
    })
}
