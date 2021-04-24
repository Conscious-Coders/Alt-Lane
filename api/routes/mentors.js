const express = require('express')
const router = express.Router()
const db = require('../db')
const verifyToken = require('../middleware/verifytoken')

router.get('/', async function (request, response) {
  try {
    const data = await db.any('SELECT users.user_id, mentors.mentor_id, users.first_name, users.last_name, users.email, mentors.bio, mentors.career_field_id, mentors.company, users.photo_url, mentors.linkedin_url, users.user_type FROM users RIGHT OUTER JOIN mentors ON (users.user_id = mentors.mentor_id)')
    return response.json({
      data: data
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

// Using id from users table

router.get('/:singleMentor', async function (request, response) {
  try {
    const getUser = parseInt(request.params.singleMentor)
    const data = await db.any(`SELECT mentors.mentor_id, users.first_name, users.last_name, users.email, mentors.bio, mentors.career_field_id, mentors.company, users.photo_url, mentors.linkedin_url, users.user_type FROM users, mentors WHERE users.user_id=${getUser} AND mentors.mentor_id=${getUser}`)

//Is used as a Get Method request
// router.post('/singleMentor', async function (request, response) {
//   try {
//     const mentor = parseInt(request.body.mentor_id)
//     const data = await db.any(`SELECT mentors.mentor_id, users.first_name, users.last_name, users.email, mentors.bio, mentors.career_field_id, mentors.company, users.photo_url, mentors.linkedin_url, users.user_type FROM users, mentors WHERE users.user_id=${mentor} AND mentors.mentor_id=${mentor}`)
// >>>>>>> main
    return response.json({
      data: data
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

//for register
router.post('/', async function (request, response) {
  let mentor = parseInt(request.body.mentor_id)
  let bio = request.body.bio
  let career_field_id = parseInt(request.body.career_field_id)
  let company = request.body.company
  let linkedin_url = request.body.linkedin_url

  try {
    await db.none(`INSERT INTO mentors (mentor_id, bio, career_field_id, company, linkedin_url) VALUES (${mentor}, '${bio}', ${career_field_id}, '${company}', '${linkedin_url}')`)

    return response.sendStatus(200)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})


router.put('/', verifyToken, async function (request, response) {
    let mentor = parseInt(request.body.mentor_id)
    let bio = request.body.bio
    let career_field_id = parseInt(request.body.career_field_id)
    let company = request.body.company
    let linkedin_url = request.body.linkedin_url
      
    try {
        if (bio) await db.any(`UPDATE mentors SET bio='${bio}' WHERE mentor_id=${mentor}`)

        if (career_field_id) await db.any(`UPDATE mentors SET career_field_id=${career_field_id} WHERE mentor_id=${mentor}`)

        if (company) await db.any(`UPDATE mentors SET company='${company}' WHERE mentor_id=${mentor}`)

        if (linkedin_url) await db.any(`UPDATE mentors SET linkedin_url='${linkedin_url}' WHERE mentor_id=${mentor}`)
        return response.sendStatus(200)
      }catch (err) {
        console.log(err)
        res.status(500).json(err)
      }
})


router.patch('/', verifyToken, async function (request, response) {
  let mentor = parseInt(request.body.mentor_id)
  let bio = request.body.bio
  let career_field_id = parseInt(request.body.career_field_id)
  let company = request.body.company
  let linkedin_url = request.body.linkedin_url
    
  try {
      if (bio) await db.any(`UPDATE mentors SET bio='${bio}' WHERE mentor_id=${mentor}`)

      if (career_field_id) await db.any(`UPDATE mentors SET career_field_id=${career_field_id} WHERE mentor_id=${mentor}`)

      if (company) await db.any(`UPDATE mentors SET company='${company}' WHERE mentor_id=${mentor}`)

      if (linkedin_url) await db.any(`UPDATE mentors SET linkedin_url='${linkedin_url}' WHERE mentor_id=${mentor}`)
      return response.sendStatus(200)
    }catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
})


module.exports = router
