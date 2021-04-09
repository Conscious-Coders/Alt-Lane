const express = require('express')
const router = express.Router()
const db = require('../db')

/* GET users listing. */
// router.get('/', function (req, res, next) {
//   res.send('respond with a resource')
// })

// Getting all fields from all users except password
router.get('/', async function (request, response) {
  try {
    const data = await db.any('SELECT id, first_name, last_name, email, photo_url, user_type FROM users')
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
    const data = await db.any(`SELECT id, first_name, last_name, email, photo_url, user_type FROM users WHERE id=${getUser}`)
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
    const data = await db.any(`SELECT password FROM users WHERE id=${getPass}`, request.body)
    return response.json({
      data: data
    })
  } catch (err) {
    response.status(404).send(err)
  }
})

router.post('/', async function (request, response) {
  try {
    await db.none('INSERT INTO users (first_name, last_name, email, password, photo_url, user_type) VALUES (${first_name}, ${last_name}, ${email}, ${password}, ${photo_url}, ${user_type})', request.body)

    return response.send(
      `The following user has been added: ${request.body.first_name} ${request.body.last_name}`
    )
  } catch (err) {
    response.status(404).send(err)
  }
})

router.patch('/:id', async function (request, response) {
  try {
    const updateUser = parseInt(request.params.id)
    if (request.body.first_name) await db.any(`UPDATE users SET first_name=$<first_name> WHERE id=${updateUser}`, request.body)

    if (request.body.last_name) await db.any(`UPDATE users SET last_name=$<last_name> WHERE id=${updateUser}`, request.body)

    if (request.body.email) await db.any(`UPDATE users SET email=$<email> WHERE id=${updateUser}`, request.body)

    if (request.body.password) await db.any(`UPDATE users SET password=$<password> WHERE id=${updateUser}`, request.body)

    if (request.body.photo_url) await db.any(`UPDATE users SET photo_url=$<photo_url> WHERE id=${updateUser}`, request.body)

    if (request.body.parent_name) await db.any(`UPDATE mentees SET parent_name=$<parent_name> WHERE user_id=${updateUser}`, request.body)

    if (request.body.parent_email) await db.any(`UPDATE mentees SET parent_email=$<parent_email> WHERE user_id=${updateUser}`, request.body)

    return response.send(
      `The following user id name has been updated: ${updateUser}`
    )
  } catch (err) {
    console.log(err)
    response.status(404).send(err)
  }
})

router.delete('/:id', async function (request, response) {
  try {
    const deleteUser = parseInt(request.params.id)
    await db.none('DELETE FROM users WHERE id=$1', deleteUser)

    return response.send(
      `The following user id has been deleted: ${deleteUser}`
    )
  } catch (err) {
    response.status(404).send(err)
  }
})

module.exports = router
