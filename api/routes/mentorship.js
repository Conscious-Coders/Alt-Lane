const express = require('express')
const router = express.Router()
const db = require('../db')
const verifyToken = require('../middleware/verifytoken')
const verifyPass = require('../middleware/verifypassword')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');
const cors = require('cors')

router.get('/get_mentees_for_mentor', async function (request, response) {
    try {
      const mentor = parseInt(request.body.mentor_id)
      //const data = await db.any(`SELECT users.user_id, users.first_name, users.last_name, users.photo_url, mentee_interests.career_field_id, mentee_interests.career_field_id mentorship.status FROM mentorship JOIN users ON mentor_id = ${mentor} AND mentee_id = user_id JOIN mentee_interests ON mentee_interests.mentee_id = mentorship.mentee_id`)
      const data = await db.any(`SELECT users.first_name, users.last_name, users.photo_url, career_field.name FROM mentorship 
                                                            JOIN users ON mentee_id = users.user_id 
                                                            JOIN mentee_interests ON mentee_interests.mentee_id = mentorship.mentee_id
                                                            JOIN career_fields ON users.user_id = mentee_interests.mentee_id AND mentee_interests.career_field_id = career_fields.id 
                                                                                                    WHERE mentorship.mentor_id = ${mentor}`)
      return response.json({
        data: data
      })
    } catch (err) {
      console.log(err)
      response.status(404).send(err)
    }
})


router.get('/get_mentor_for_mentee', async function (request, response) {
    try {
      const mentor_id = parseInt(request.body.mentor_id)
      const data = await db.any(`SELECT users.user_id, users.first_name, users.last_name, users.photo_url, mentorship.status FROM mentorship JOIN users ON mentee_id = user_id`)
     // SELECT users.first_name, users.last_name, users.photo_url, career_fields.name FROM users JOIN mentee_interests ON mentee_id=${mentor_id} AND mentee_interests.mentee_id = users.id JOIN career_fields ON mentee_interests.career_field_id = career_fields.id`)
      return response.json({
        data: data
      })
    } catch (err) {
      console.log(err)
      response.status(404).send(err)
    }
})

module.exports = router