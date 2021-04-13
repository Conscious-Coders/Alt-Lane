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
    const data = await db.any('SELECT users.user_id, mentees.mentee_id, users.first_name, users.last_name, users.email, mentees.parent_name, mentees.parent_email, users.photo_url, users.user_type FROM users RIGHT OUTER JOIN mentees ON (users.user_id = mentees.mentee_id)')
    return response.json({
      data: data
    })
  } catch (err) {
    console.log(err)
    response.status(404).send(err)
  }
})

// Using id from users table
router.get('/singleMentee', async function (request, response) {
  try {
    const getUser = parseInt(request.body.id)
    const data = await db.any(`SELECT mentees.mentee_id, users.first_name, users.last_name, users.email, mentees.parent_name, mentees.parent_email, users.photo_url, users.user_type FROM users, mentees WHERE users.user_id=${getUser} AND mentees.mentee_id=${getUser}`)
    return response.json({
      data: data
    })
  } catch (err) {
    console.log(err)
    response.status(404).send(err)
  }
})


router.post('/', verifyToken, async function (request, response) {
  let mentee = parseInt(request.body.mentee_id)
  let parent_name = request.body.parent_name
  let parent_email = request.body.parent_email

  jwt.verify(request.token, 'secretKey', async (err, authData) => {
    console.log(authData)
    if(err){
      response.sendStatus(403)
    } 
    else if(authData.data[0].user_id !== mentee){
      response.sendStatus(500)
      console.log('not working')
    }else {
      try {
      await db.none(`INSERT INTO mentees (mentee_id, parent_name, parent_email) VALUES (${mentee}, '${parent_name}', '${parent_email}')`)
      return response.sendStatus(200)
    } catch (err) {
      console.log(err)
      console.log(request.body) 
      response.status(404).send(err)
    }
  }
})
})


router.put('/', verifyToken, async function (request, response) {
  jwt.verify(request.token, 'secretKey', async (err, authData) => {
    //console.log(authData)
    if(err){
      response.sendStatus(403)
    } 
    else if(authData.data[0].user_id !== parseInt(request.body.id)){
      response.sendStatus(500)
      console.log('not working')
    }else {
      console.log(authData.data[0].user_id)
      let mentee = parseInt(request.body.id)
      let parent_name = request.body.parent_name
      let parent_email = request.body.parent_email
      try {
        await db.none(`UPDATE mentees SET parent_name='${parent_name}', parent_email='${parent_email}' WHERE mentee_id=${mentee}`)
        return response.sendStatus(200)
      }catch (err) {
        response.status(404).send(err)
      }
    }
  })
})


router.patch('/', verifyToken, async function (request, response) {
  jwt.verify(request.token, 'secretKey', async (err, authData) => {
    //console.log(authData)
    if(err){
      response.sendStatus(403)
    } 
    else if(authData.data[0].user_id !== parseInt(request.body.id)){
      response.sendStatus(500)
      console.log('not working')
    }else {
      console.log(authData.data[0].user_id)
      let mentee = parseInt(request.body.id)
      let parent_name = request.body.parent_name
      let parent_email = request.body.parent_email
      try {
        await db.none(`UPDATE mentees SET parent_name='${parent_name}', parent_email='${parent_email}' WHERE mentee_id=${mentee}`)
        return response.sendStatus(200)
      }catch (err) {
        response.status(404).send(err)
      }
    }
  })
})

module.exports = router
