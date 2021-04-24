const express = require('express')
const router = express.Router()
const db = require('../db')
const verifyToken = require('../middleware/verifytoken')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

//DO NOT RETURN status or anything else
//Is used as a Get Method request
router.post('/login', async function (req, res) {
  try {
    const email = req.body.email  
    const password = req.body.password
    const data = await db.any(`SELECT first_name, users.user_id, users.user_type, users.password FROM users where users.email = '${email}'`)

    let samePassword = bcrypt.compareSync(password, data[0].password)
  
     if(samePassword){
      jwt.sign({data}, process.env.RANDOM_TOKEN, {expiresIn: '3600s'}, async (err, token)=>{
       await res.status(202).json({
         user_id: data[0].user_id,
         user_type: data[0].user_type,
         isAuthorized: true, 
         name: data[0].first_name,
         token
       })
      })} 
      else {
        res.status(403).json({
          isAuthorized: false, 
        })
      }
     } catch(err){
         res.status(500).json({
           error: err, 
           isAuthorized: false
         })
      }
    })
 


router.get('/', async function (request, response) {
  try {
    const data = await db.any('SELECT users.user_id, first_name, last_name, email, photo_url, user_type FROM users')
    
    return response.json({
      data: data
    })
  } catch (err) {
    console.log(err)
    response.status(500).json(err)
  }
})


//Is used as a Get Method request
router.post('/get', async function (request, response) {
  try {
    const getUser = parseInt(request.body.user_id)
    const data = await db.any(`SELECT users.user_id, first_name, last_name, email, photo_url, user_type FROM users WHERE user_id=${getUser}`)
    return response.json({
      data: data
    })
  } catch (err) {
    response.status(500).json(err)
  }
})

// Getting password of user with specified id
//Is used as a Get Method request
router.post('/pass', verifyToken, async function (request, response) {
  try {
    const user_id = parseInt(request.body.user_id)
    const password = request.body.password
    const data = await db.any(`SELECT password FROM users WHERE users.user_id=${user_id}`)
    const samePassword = bcrypt.compareSync(password, data[0].password)
    if(samePassword) {
      return response.json({
        isVerified: samePassword
      })
    }
  } catch (err) {
    console.log(err)
    response.status(500).json(err)
  }
})


router.post('/register', async function (request, response) {
  const hashed = bcrypt.hashSync(request.body.password, 10)
  const first_name = request.body.first_name
  const last_name = request.body.last_name
  const email = request.body.email
  const photo_url = request.body.photo_url
  const user_type = request.body.user_type
  const parent_name = request.body.parent_name
  const parent_email = request.body.parent_email
  const bio = request.body.bio
  const career_field_id = parseInt(request.body.career_field_id)
  const company = request.body.company
  const linkedin_url = request.body.linkedin_url
  const career_ids = request.body.career_field_array 
  try {
    await db.none(`INSERT INTO users (first_name, last_name, email, password, photo_url, user_type) VALUES ('${first_name}', '${last_name}', '${email}', '${hashed}', '${photo_url}', '${user_type}')`)

    const data = await db.any(`SELECT user_id FROM users WHERE email= '${email}'`)

    if(user_type === 'mentee'){
      let values = ""

      for(let i = 0; i < career_ids.length; i++) {
        if(i === career_ids.length -1){
          values += `(${parseInt(data[0].user_id)}, ${career_ids[i]})`
        }else{
          values += `(${parseInt(data[0].user_id)}, ${career_ids[i]}),`
        }
      }

      await db.none(`INSERT INTO mentees (mentee_id, parent_name, parent_email) VALUES (${parseInt(data[0].user_id)}, '${parent_name}', '${parent_email}')`)
      await db.none(`INSERT INTO mentee_interests (mentee_id, career_field_id) VALUES ${values}`)
    }else{
      await db.none(`INSERT INTO mentors (mentor_id, bio, career_field_id, company, linkedin_url) VALUES (${parseInt(data[0].user_id)}, '${bio}', ${career_field_id}, '${company}', '${linkedin_url}')`)
    }
    return response.sendStatus(200)
  } catch (err) {
    console.log(err)
    response.status(500).json(err)
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
    response.status(500).json(err)
  }
})

router.patch('/', verifyToken, async function (request, response) {
        try {
        const updateUsers = parseInt(request.body.user_id)
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
        response.status(500).json(err)
      }
  })



router.put('/', verifyToken, async function (request, response) {
        try {
        const updateUsers = parseInt(request.body.user_id)
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
        response.status(500).json(err)
      }
  })

router.delete('/', verifyToken, async function (request, response) {
  try {
    const deleteUser = parseInt(request.body.user_id)
    await db.none('DELETE FROM users WHERE user_id=$1', deleteUser)
    return response.sendStatus(200)
    
  } catch (err) {
    console.log(err)
    response.status(500).json(err)
  }

})

module.exports = router
