const express = require('express')
const router = express.Router()
const db = require('../db')
const verifyToken = require('../middleware/verifytoken')
const verifyPass = require('../middleware/verifypassword')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');
const cors = require('cors')
const randomToken = require('uuid-random')



router.get('/', async function (request, response){
  try{
    const data = await db.any('SELECT * FROM mentorship')

    return response.json({
      data: data
    })
  }catch(err){
    console.log(err)
    response.status(404).send(err)
  }
})

//Returns all mentors associated with a single mentee
//Is used as a Get Method request
router.post('/get_mentees_for_mentor', async function (request, response) {
    try {
      const mentor = parseInt(request.body.mentor_id)
      const data = await db.any(`SELECT users.first_name, users.last_name, users.photo_url, career_fields.name FROM mentorship 
                                        JOIN users ON mentee_id = users.user_id
                                        JOIN mentee_interests ON mentee_interests.mentee_id = mentorship.mentee_id
                                        JOIN career_fields ON mentee_interests.career_field_id = career_fields.id                    
                                            WHERE mentorship.mentor_id = ${mentor}`)
      return response.json({
        data: data
      })
    } catch (err) {
      console.log(err)
      response.status(404).send(err)
    }
})


//Returns all mentors associated with a single mentee
//Is used as a Get Method request
router.post('/get_mentors_for_mentee', async function (request, response) {
    try {
      const mentee = parseInt(request.body.mentee_id)
      const data = await db.any(`SELECT users.first_name, users.last_name, users.photo_url, mentors.bio, career_fields.name, mentorship.status FROM mentorship
                                                               JOIN users ON mentorship.mentor_id = users.user_id
                                                               JOIN mentors ON mentorship.mentor_id = mentors.mentor_id
                                                               JOIN career_fields ON mentors.career_field_id = career_fields.id 
                                                                      WHERE mentorship.mentee_id = ${mentee}`)
      return response.json({
        data: data
      })
    } catch (err) {
      console.log(err)
      response.status(404).send(err)
    }
})



router.post('/', verifyToken, async function (request, response) {
  const mentee = parseInt(request.body.mentee_id)
  const mentor = parseInt(request.body.mentor_id)
  const emailToken = randomToken()
    console.log(emailToken)
    jwt.verify(request.token, 'secretKey', async (err, authData) => {
      if(err){
        response.sendStatus(403)
      } 
      else if(authData.data[0].user_id !== mentee){
        response.sendStatus(500)
        console.log('not working')
      }else {
        try {
        await db.none(`INSERT INTO mentorship (mentor_id, mentee_id, status, temp_token) VALUES (${mentor}, ${mentee}, 'pending', '${emailToken}')`)
        return response.sendStatus(200)
      } catch (err) {
        console.log(err)
        response.status(404).send(err)
      }
    }
  })
})


router.put('/', verifyToken, async function (request, response) {
  const mentee = parseInt(request.body.mentee_id)
  const mentor = parseInt(request.body.mentor_id)

    jwt.verify(request.token, 'secretKey', async (err, authData) => {
      if(err){
        response.sendStatus(403)
      } 
      else if(authData.data[0].user_id !== mentee){
        response.sendStatus(500)
        console.log('not working')
      }else {
        try {

        await db.none(`UPDATE mentorship SET status = 'active', temp_token= null WHERE mentee_id=${mentee} AND mentor_id = ${mentor}`)
        return response.sendStatus(200)
      } catch (err) {
        console.log(err)
        response.status(404).send(err)
      }
    }
  })
})


router.patch('/', verifyToken, async function (request, response) {
  const mentee = parseInt(request.body.mentee_id)
  const mentor = parseInt(request.body.mentor_id)

    jwt.verify(request.token, 'secretKey', async (err, authData) => {
      if(err){
        response.sendStatus(403)
      } 
      else if(authData.data[0].user_id !== mentee){
        response.sendStatus(500)
        console.log('not working')
      }else {
        try {

        await db.none(`UPDATE mentorship SET status='active', temp_token=null WHERE mentee_id=${mentee} AND mentor_id=${mentor}`)
        return response.sendStatus(200)
      } catch (err) {
        console.log(err)
        response.status(404).send(err)
      }
    }
  })
})



router.delete('/', verifyToken, async function (request, response) {
  const mentee = parseInt(request.body.mentee_id)
  const mentor = parseInt(request.body.mentor_id)

    jwt.verify(request.token, 'secretKey', async (err, authData) => {
      if(err){
        response.sendStatus(403)
      } 
      else if(authData.data[0].user_id !== mentee){
        response.sendStatus(500)
        console.log('not working')
      }else {
        try {

        await db.none(`DELETE FROM mentorship WHERE mentee_id=${mentee} AND mentor_id=${mentor}`)
        return response.sendStatus(200)
      } catch (err) {
        console.log(err)
        response.status(404).send(err)
      }
    }
  })
})

module.exports = router