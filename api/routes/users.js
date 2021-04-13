const express = require('express')
const router = express.Router()
const db = require('../db')
const verifyToken = require('../middleware/verifytoken')
const verifyPass = require('../middleware/verifypassword')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');
const cors = require('cors')
/* GET users listing. */
// router.get('/', function (req, res, next) {
//   res.send('respond with a resource')
// })

// Getting all fields from all users except password

cors({origin: 'http://localhost:3000', credentials: true })



//DO NOT RETURN status or anything else
router.post('/login', async function (req, res) {
  try {
    const email = req.body.email  //JOIN mentorship ON users.id=mentorship.mentor_id
    const password = req.body.password
    const data = await db.any(`SELECT users.user_id, users.user_type, users.password FROM users where users.email = '${email}'`)
     //test password equality
     console.log(data)
     let samePassword = verifyPass(password, data[0].password)
     console.log(samePassword)
     //if password matches
    
     if(samePassword)
      jwt.sign({data}, 'secretKey', {expiresIn: '3600s'}, async (err, token)=>{
       await res.status(202).cookie('token', token, {sameSite:'strict', httpOnly: true}).json({
<<<<<<< HEAD
         data, // return only user_id & user_type
         
=======
         user_id: data[0].user_id,
         user_type: data[0].user_type,
>>>>>>> 2306d71a7a398d79cdb8390ccda661d678fb5648
         token
       })
       
      })
       console.log(req.headers)
       //return res.sendStatus(200)
       }catch(err){
         console.log(err)
     res.status(404).send(err)
   }
 });
  

router.get('/', async function (request, response) {
  try {
    const data = await db.any('SELECT users.user_id, first_name, last_name, email, photo_url, user_type FROM users')
    return response.json({
      data: data
    })
  } catch (err) {
    response.status(404).send(err)
  }
})

router.get('/:id', async function (request, response) {
  try {
    const getUser = parseInt(request.params.id)
    const data = await db.any(`SELECT users.user_id, first_name, last_name, email, photo_url, user_type FROM users WHERE id=${getUser}`)
    return response.json({
      data: data
    })
  } catch (err) {
    response.status(404).send(err)
  }
})

// Getting password of user with specified id
router.get('/pass/:id', async function (request, response) {
  try {
    const getPass = parseInt(request.params.id)
    const data = await db.any(`SELECT password FROM users WHERE users.user_id=${getPass}`, request.body)
    return response.json({
      data: data
    })
  } catch (err) {
    response.status(404).send(err)
  }
})

router.post('/', async function (request, response) {
  let hashed = bcrypt.hashSync(request.body.password, 10)
  let first_name = request.body.first_name
  let last_name = request.body.last_name
  let email = request.body.email
  let photo_url = request.body.photo_url
  let user_type = request.body.user_type
  try {
    await db.none(`INSERT INTO users (first_name, last_name, email, password, photo_url, user_type) VALUES ('${first_name}', '${last_name}', '${email}', '${hashed}', '${photo_url}', '${user_type}')`, hashed)
    return response.sendStatus(200)
  } catch (err) {
    console.log(err)
    response.status(404).send(err)
  }
})

router.patch('/:id', verifyToken, async function (request, response) {
  jwt.verify(request.token, 'secretKey', async (err, authData) => {
    console.log(authData)
    if(err){
      response.sendStatus(403)
    } 
    else if(authData.data[0].user_id !== parseInt(request.params.id)){
      response.sendStatus(500)
      console.log('not working')
    }else {
      console.log(authData.data[0].user_id)
        try {
        const updateUsers = parseInt(request.params.id)
        let first_name = request.body.first_name
        let last_name = request.body.last_name
        let email = request.body.email
        let password = request.body.password
        let photo_url = request.body.photo_url
        if (first_name) await db.any(`UPDATE users SET first_name='${first_name}' WHERE user_id=${updateUsers}`)
    
        if (last_name) await db.any(`UPDATE users SET last_name='${last_name}' WHERE user_id=${updateUsers}`)
    
        if (email) await db.any(`UPDATE users SET email='${email}' WHERE user_id=${updateUsers}`)
        
        if (password) {
          let hashed = bcrypt.hashSync(request.body.password, 10)
          await db.any(`UPDATE users SET password='${hashed}' WHERE user_id=${updateUsers}`)
        }
        if (photo_url) await db.any(`UPDATE users SET photo_url='${photo_url}' WHERE user_id=${updateUsers}`)
        return response.sendStatus(200)
      } catch (err) {
        console.log(err)
        response.status(404).send(err)
      }
  }
  })
})


router.put('/:id', verifyToken, async function (request, response) {
  jwt.verify(request.token, 'secretKey', async (err, authData) => {
    console.log(authData)
    if(err){
      response.sendStatus(403)
    } 
    else if(authData.data[0].user_id !== parseInt(request.params.id)){
      response.sendStatus(500)
      console.log('not working')
    }else {
      console.log(authData.data[0].user_id)
        try {
        const updateUsers = parseInt(request.params.id)
        let first_name = request.body.first_name
        let last_name = request.body.last_name
        let email = request.body.email
        let password = request.body.password
        let photo_url = request.body.photo_url
        if (first_name) await db.any(`UPDATE users SET first_name='${first_name}' WHERE user_id=${updateUsers}`)
    
        if (last_name) await db.any(`UPDATE users SET last_name='${last_name}' WHERE user_id=${updateUsers}`)
    
        if (email) await db.any(`UPDATE users SET email='${email}' WHERE user_id=${updateUsers}`)
        
        if (password) {
          let hashed = bcrypt.hashSync(request.body.password, 10)
          await db.any(`UPDATE users SET password='${hashed}' WHERE user_id=${updateUsers}`)
        }
        if (photo_url) await db.any(`UPDATE users SET photo_url='${photo_url}' WHERE user_id=${updateUsers}`)
       return response.sendStatus(200)
      } catch (err) {
        console.log(err)
        response.status(404).send(err)
      }
  }
  })
})

router.delete('/:id', verifyToken, async function (request, response) {
  jwt.verify(request.token, 'secretKey', async (err, authData) => {
    console.log(authData)
    if(err){
      response.sendStatus(403)
    } 
    else if(authData.data[0].user_id !== parseInt(request.params.id)){
      response.sendStatus(500)
      console.log('not working')
    }else {
      console.log(authData.data[0].user_id)
  try {
    const deleteUser = parseInt(request.params.id)
    await db.none('DELETE FROM users WHERE user_id=$1', deleteUser)
    return response.sendStatus(200)
    
  } catch (e) {
    response.status(404).send(e)
  }
  }
})
})

module.exports = router
