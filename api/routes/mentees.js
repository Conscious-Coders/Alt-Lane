const express = require('express')
const router = express.Router()
const db = require('../db')

router.get('/', async function (request, response) {
  try {
    const data = await db.any('SELECT users.id, mentees.user_id, users.first_name, users.last_name, users.email, mentees.parent_name, mentees.parent_email, users.photo_url FROM users RIGHT OUTER JOIN mentees ON (users.id = mentees.user_id)')
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
    const data = await db.any(`SELECT mentees.user_id, users.first_name, users.last_name, users.email, mentees.parent_name, mentees.parent_email, users.photo_url FROM users, mentees WHERE users.id=${getUser} AND mentees.user_id=${getUser}`)
    return response.json({
      data: data
    })
  } catch (err) {
    response.status(404).send(err)
  }
})

router.post('/', async function (request, response) {
  try {
    await db.none('INSERT INTO mentees (parent_name, parent_email) VALUES (${parent_name}, ${parent_email})', request.body)

    return response.send(
      `The following career_field has been added: ${request.body.name}`
    )
  } catch (err) {
    response.status(404).send(err)
  }
})

module.exports = router
