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
    const data = await db.any('SELECT users.user_id, mentors.mentor_id, users.first_name, users.last_name, users.email, mentors.bio, mentors.career_field_id, mentors.company, users.photo_url, mentors.linkedin_url, users.user_type FROM users RIGHT OUTER JOIN mentors ON (users.user_id = mentors.mentor_id)')
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
    const data = await db.any(`SELECT mentors.mentor_id, users.first_name, users.last_name, users.email, mentors.bio, mentors.career_field_id, mentors.company, users.photo_url, mentors.linkedin_url, users.user_type FROM users, mentors WHERE users.user_id=${getUser} AND mentors.mentor_id=${getUser}`)
    return response.json({
      data: data
    })
  } catch (err) {
    response.status(404).send(err)
  }
})

router.post('/:id', async function (request, response) {
  let mentor = parseInt(request.params.id)
  let bio = request.body.bio
  let career_field_id = parseInt(request.body.career_field_id)
  let company = request.body.company
  let linkedin_url = request.body.linkedin_url
  try {
    await db.none(`INSERT INTO mentors (mentor_id, bio, career_field_id, company, linkedin_url) VALUES (${mentor}, '${bio}', ${career_field_id}, '${company}', '${linkedin_url}')`)

    return response.sendStatus(200)
  } catch (err) {
    console.log(err)
    response.status(404).send(err)
  }
})


router.put('/:id', verifyToken, async function (request, response) {
  jwt.verify(request.token, 'secretKey', async (err, authData) => {
    //console.log(authData)
    if(err){
      response.sendStatus(403)
    } 
    else if(authData.data[0].user_id !== parseInt(request.params.id)){
      response.sendStatus(500)
      console.log('not working')
    }else {
      console.log(authData.data[0].user_id)
      let mentor = parseInt(request.params.id)
      let bio = request.body.bio
      let career_field_id = parseInt(request.body.career_field_id)
      let company = request.body.company
      let linkedin_url = request.body.linkedin_url
      try {
        await db.none(`UPDATE mentors SET bio='${bio}', career_field_id=${career_field_id}, company='${company}', linkedin_url='${linkedin_url}' WHERE mentor_id=${mentor}`)
        return response.sendStatus(200)
      }catch (err) {
        console.log(err)
        response.status(404).send(err)
      }
    }
  })
})


router.patch('/:id', verifyToken, async function (request, response) {
  jwt.verify(request.token, 'secretKey', async (err, authData) => {
    //console.log(authData)
    if(err){
      response.sendStatus(403)
    } 
    else if(authData.data[0].user_id !== parseInt(request.params.id)){
      response.sendStatus(500)
      console.log('not working')
    }else {
      console.log(authData.data[0].user_id)
      let mentor = parseInt(request.params.id)
      let bio = request.body.bio
      let career_field_id = parseInt(request.body.career_field_id)
      let company = request.body.company
      let linkedin_url = request.body.linkedin_url
      try {
        await db.none(`UPDATE mentors SET bio='${bio}', career_field_id=${career_field_id}, company='${company}', linkedin_url='${linkedin_url}' WHERE mentor_id=${mentor}`)
        return response.sendStatus(200)
      }catch (err) {
        console.log(err)
        response.status(404).send(err)
      }
    }
  })
})

module.exports = router
