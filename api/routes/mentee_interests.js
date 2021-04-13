const express = require('express')
const router = express.Router()
const db = require('../db')
const verifyToken = require('../middleware/verifytoken')
const verifyPass = require('../middleware/verifypassword')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');
const cors = require('cors')

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

//Will return all interests for a single mentee
router.get('/singleMenteeInterest', async function (request, response) {
    try {
      const getInterests = parseInt(request.body.id)  
      const data = await db.any(`SELECT career_fields.name FROM mentee_interests JOIN career_fields ON mentee_id=${getInterests} AND mentee_interests.career_field_id = career_fields.id`)
      return response.json({
        data: data
      })
    } catch (err) {
      console.log(err)
      response.status(404).send(err)
    }
})


//Will return all interests for a single mentee
router.get('/career_field_name_with_id', async function (request, response) {
    try {
      const getInterests = parseInt(request.body.id)  
      const data = await db.any(`SELECT id, name FROM career_fields JOIN mentee_interests ON mentee_id=${getInterests} AND career_fields.id = mentee_interests.career_field_id`)
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
      const data = await db.any(`SELECT users.first_name, users.last_name, users.photo_url, career_fields.name, mentor_id FROM users JOIN mentee_interests ON mentee_id=${getInterests} AND mentee_interests.mentee_id = users.user_id JOIN career_fields ON mentee_interests.career_field_id = career_fields.id JOIN mentorship ON mentee_interests.mentee_id = mentorship.mentee_id`)
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