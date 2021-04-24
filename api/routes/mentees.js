const express = require('express')
const router = express.Router()
const db = require('../db')
const verifyToken = require('../middleware/verifytoken')

router.get('/', async function (request, response) {
  try {
    const data = await db.any('SELECT users.user_id, mentees.mentee_id, users.first_name, users.last_name, users.email, mentees.parent_name, mentees.parent_email, users.photo_url, users.user_type FROM users RIGHT OUTER JOIN mentees ON (users.user_id = mentees.mentee_id)')
    return response.json({
      data: data
    })
  } catch (err) {
    console.log(err)
    response.status(500).json(err)
  }
})

// Using id from users table
//Is used as a Get Method request
// for register
router.get('/:singleMentee', async function (request, response) {
  try {
    const getUser = parseInt(request.params.singleMentee)
    const data = await db.any(`SELECT mentees.mentee_id, users.first_name, users.last_name, users.email, mentees.parent_name, mentees.parent_email, users.photo_url, users.user_type FROM users, mentees WHERE users.user_id=${getUser} AND mentees.mentee_id=${getUser}`)
    return response.json({
      data: data
    })
  } catch (err) {
    console.log(err)
    response.status(500).json(err)
  }
})

//for register
router.post('/', async function (request, response) {
  let mentee = parseInt(request.body.mentee_id)
  let parent_name = request.body.parent_name
  let parent_email = request.body.parent_email  
    try {
      await db.none(`INSERT INTO mentees (mentee_id, parent_name, parent_email) VALUES (${mentee}, '${parent_name}', '${parent_email}')`)
      return response.sendStatus(200)
    } catch (err) {
      console.log(err)
      response.status(500).json(err)
    }
 
})


router.put('/', verifyToken, async function (request, response) {
 
    let mentee = parseInt(request.body.mentee_id)
    let parent_name = request.body.parent_name
    let parent_email = request.body.parent_email
    
    try {
        if (parent_name) await db.any(`UPDATE mentees SET parent_name='${parent_name}' WHERE mentee_id=${mentee}`)
        if (parent_email) await db.any(`UPDATE mentees SET parent_email='${parent_email}' WHERE mentee_id=${mentee}`)

        return response.sendStatus(200)
      }catch (err) {
        response.status(500).json(err)
      }
})


router.patch('/', verifyToken, async function (request, response) {
 
  let mentee = parseInt(request.body.mentee_id)
  let parent_name = request.body.parent_name
  let parent_email = request.body.parent_email
  
  try {
      if (parent_name) await db.any(`UPDATE mentees SET parent_name='${parent_name}' WHERE mentee_id=${mentee}`)
      if (parent_email) await db.any(`UPDATE mentees SET parent_email='${parent_email}' WHERE mentee_id=${mentee}`)

      return response.sendStatus(200)
    }catch (err) {
      response.status(500).json(err)
    }
})
 
module.exports = router
