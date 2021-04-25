const mentorship_data = require('../seed_data/mentorship')

exports.seed = function (knex) {
  return knex('mentorship').del()
    .then(function () {
      return knex('mentorship').insert(mentorship_data)
    })
}
