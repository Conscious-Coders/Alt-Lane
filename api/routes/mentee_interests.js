const express = require('express')
const router = express.Router()
const db = require('../db')
const verifyToken = require('../middleware/verifytoken')
const verifyPass = require('../middleware/verifypassword')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');
const cors = require('cors')
cors({origin: 'http://localhost:3000', credentials: true })

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
//Is used as a Get Method request
router.post('/interests_for_one_mentee', async function (request, response) {
    try {
      const mentee_id = parseInt(request.body.mentee_id)  
      const data = await db.any(`SELECT career_fields.name FROM mentee_interests JOIN career_fields ON mentee_interests.career_field_id = career_fields.id WHERE mentee_id=${mentee_id}`)
      return response.json({
        data: data
      })
    } catch (err) {
      console.log(err)
      response.status(404).send(err)
    }
})


router.post('/add_mentee_and_interest', verifyToken, async function (request, response) {
    const mentee = parseInt(request.body.mentee_id)
    const career_id = parseInt(request.body.career_id)
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
          await db.none(`INSERT INTO mentee_interests (mentee_id, career_field_id) VALUES (${mentee}, ${career_id})`)
    
          return response.sendStatus(200)
      } catch (err) {
        console.log(err)
        response.status(404).send(err)
      }
    }
  })
})


router.delete('/', verifyToken, async function (request, response) {
  jwt.verify(request.token, 'secretKey', async (err, authData) => {
    console.log(authData)
    if(err){
      response.sendStatus(403)
    } 
    else if(authData.data[0].user_id !== parseInt(request.body.mentee_id)){
      response.sendStatus(500)
      console.log('not working')
    }else {
      console.log(authData.data[0].user_id)
      try {
        const mentee = parseInt(request.body.mentee_id)
        const career_id = parseInt(request.body.career_id)
      
        await db.none(`DELETE FROM mentee_interests WHERE mentee_id=${mentee} AND career_field_id = ${career_id}`)
        return response.sendStatus(200)
    
      }catch(err){
        console.log(err)
        response.status(404).send(err)
      }
    }
  })
})

module.exports = router