const express = require('express')
const router = express.Router()
const db = require('../db')

router.get('/', async function (request, response) {
  try {
    const data = await db.any('SELECT users.id, mentors.user_id, users.first_name, users.last_name, users.email, mentors.bio, mentors.career_field_id, mentors.company, users.photo_url, mentors.linkedin_url FROM users RIGHT OUTER JOIN mentors ON (users.id = mentors.user_id)')
    return response.json({
      data: data
    })
  } catch (err) {
    console.log(err)
    response.status(404).send(err)
  }
})

// Using id from users table
router.get('/:id', async function (request, response) {
  try {
    const getUser = parseInt(request.params.id)
    const data = await db.any(`SELECT mentors.user_id, users.first_name, users.last_name, users.email, mentors.bio, mentors.career_field_id, mentors.company, users.photo_url, mentors.linkedin_url FROM users, mentors WHERE users.id=${getUser} AND mentors.user_id=${getUser}`)
    return response.json({
      data: data
    })
  } catch (err) {
    response.status(404).send(err)
  }
})

router.post('/', async function (request, response) {
  try {
    await db.none('INSERT INTO mentors (bio, career_field_id, company, linkedin_url) VALUES (${bio}, ${career_field_id}, ${company}, ${linkedin_url})', request.body)

    return response.send(
      `The following career_field has been added: ${request.body.name}`
    )
  } catch (err) {
    response.status(404).send(err)
  }
})

module.exports = router
