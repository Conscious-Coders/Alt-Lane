const express = require('express')
const router = express.Router()
const db = require('../db')
const verifyToken = require('../middleware/verifytoken')

router.get('/', verifyToken, async function (request, response) {
  try {
    const data = await db.any('SELECT * FROM mentee_interests')
    return response.json({
      data: data
    })
  } catch (err) {
    response.status(500).json(err)
  }
})

router.post('/', verifyToken, async function (request, response) {
  try {
    const data = await db.any('SELECT * FROM mentee_interests')
    return response.json({
      data: data
    })
  } catch (err) {
    response.status(500).json(err)
  }
})

// for register
router.post('/getMenteeInterests', async function (request, response) {
  const mentee = parseInt(request.body.mentee_id)
  const career_ids = request.body.career_field_array

  try {
    let values = ''
    for (let i = 0; i < career_ids.length; i++) {
      if (i === career_ids.length - 1) {
        values += `(${mentee}, ${career_ids[i]})`
      } else {
        values += `(${mentee}, ${career_ids[i]}),`
      }
    }
    await db.none(`INSERT INTO mentee_interests (mentee_id, career_field_id) VALUES ${values}`)

    return response.sendStatus(200)
  } catch (err) {
    console.log(err)
    response.status(500).json(err)
  }
})
// for deleting all interests and adding new ones for profile
router.post('/deleteInterests', verifyToken, async function (request, response) {
  const mentee = parseInt(request.body.mentee_id)
  const career_ids = request.body.career_field_array
  try {
    let values = ''
    for (let i = 0; i < career_ids.length; i++) {
      if (i === career_ids.length - 1) {
        values += `(${mentee}, ${career_ids[i]})`
      } else {
        values += `(${mentee}, ${career_ids[i]}),`
      }
    }
    await db.none(`DELETE FROM mentee_interests WHERE mentee_id=${mentee}`)
    await db.none(`INSERT INTO mentee_interests (mentee_id, career_field_id) VALUES ${values}`)

    return response.sendStatus(200)
  } catch (err) {
    console.log(err)
    response.status(500).json(err)
  }
})

// Will return all interests for a single mentee
// Is used as a Get Method request
router.post('/interests_for_one_mentee', verifyToken, async function (request, response) {
  console.log('In mentee interes route -> line 78')
  try {
    const mentee_id = parseInt(request.body.mentee_id)
    console.log('DELTE LATER', mentee_id)
    const data = await db.any(`SELECT career_fields.name FROM mentee_interests JOIN career_fields ON mentee_interests.career_field_id = career_fields.id WHERE mentee_id=${mentee_id}`)
    console.log('Delete later: ', data)
    return response.json({
      data: data
    })
  } catch (err) {
    console.log(err)
    response.status(500).json(err)
  }
})

router.post('/add_mentee_and_interest', verifyToken, async function (request, response) {
  const mentee = parseInt(request.body.mentee_id)
  const career_id = parseInt(request.body.career_id)
  try {
    await db.none(`INSERT INTO mentee_interests (mentee_id, career_field_id) VALUES (${mentee}, ${career_id})`)
    return response.sendStatus(200)
  } catch (err) {
    console.log(err)
    response.status(500).json(err)
  }
})

router.delete('/', verifyToken, async function (request, response) {
  try {
    const mentee = parseInt(request.body.mentee_id)
    const career_id = parseInt(request.body.career_id)
    await db.none(`DELETE FROM mentee_interests WHERE mentee_id=${mentee} AND career_field_id = ${career_id}`)
    return response.sendStatus(200)
  } catch (err) {
    console.log(err)
    response.status(500).json(err)
  }
})

module.exports = router
