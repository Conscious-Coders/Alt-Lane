const express = require('express')
const router = express.Router()
const db = require('../db')

router.get('/', async function (request, response) {
  try {
    const data = await db.any('SELECT * FROM mentee_interests')
    return response.json({
      data: data
    })
  } catch (err) {
    console.log(err)
    response.status(404).send(err)
  }
})

//mentee interests id
router.get('/:id', async function (request, response) {
    try {
      const getInterests = parseInt(request.params.id)  
      const data = await db.any(`SELECT * FROM mentee_interests WHERE mentee_id=${getInterests}`)
      return response.json({
        data: data
      })
    } catch (err) {
      console.log(err)
      response.status(404).send(err)
    }
})


router.get('/name/:id', async function (request, response) {
    try {
      const getInterests = parseInt(request.params.id)  
      const data = await db.any(`SELECT name FROM career_fields JOIN mentee_interests ON mentee_id=${getInterests} AND career_fields.id = mentee_interests.career_field_id`)
      return response.json({
        data: data
      })
    } catch (err) {
      console.log(err)
      response.status(404).send(err)
    }
})


router.get('/mentee/:id', async function (request, response) {
    try {
      const getInterests = parseInt(request.params.id)  //JOIN mentors ON career_fields.id = mentors.career_field_id JOIN mentorship ON mentors.user_id = mentorship.mentor_id JOIN mentees ON users.id = mentees.user_id/, mentors.user_id, mentors.company, mentors.linkedin_url, mentees.parent_name,mentees.parent_email
      const data = await db.any(`SELECT users.first_name, users.last_name, career_fields.name FROM users JOIN mentee_interests ON mentee_id=${getInterests} AND mentee_interests.mentee_id = users.id JOIN career_fields ON mentee_interests.career_field_id = career_fields.id`)
      return response.json({
        data: data
      })
    } catch (err) {
      console.log(err)
      response.status(404).send(err)
    }
})


router.get('/temp/:email/:pass', async function (request, response) {
  try {
    const getInterests = request.params.email  //JOIN mentorship ON users.id=mentorship.mentor_id
    const getPass = request.params.pass
    console.log(getInterests)
    console.log(getPass)
    const data = await db.any(`SELECT users.id, users.first_name, users.last_name, users.user_type, mentorship.mentee_id FROM users JOIN mentorship ON users.email = '${getInterests}' AND users.password = '${getPass}' AND users.id = mentorship.mentor_id`)
    return response.json({
      data: data
    })
  } catch (err) {
    console.log(err)
    response.status(404).send(err)
  }
})
module.exports = router