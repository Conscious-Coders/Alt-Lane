require('dotenv').config()
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const testAPIRouter = require('./routes/testAPI')

const pg = require('pg-promise')
const db = require('./db')
const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/testAPI', testAPIRouter)
app.use('/test', testAPIRouter)

app.get('/api/users', async function (request, response) {
  try {
    const data = await db.any('SELECT * FROM users')
    return response.json({
      data: data
    })
  } catch (err) {
    response.status(404).send(err)
  }
})

app.post('/api/users/add', async function (request, response) {
  try {
    await db.none('INSERT INTO users (first_name, last_name, email, password, photo_url) VALUES (${first_name}, ${last_name}, ${email}, ${password}, ${photo_url})', request.body)

    return response.send(
      `The following user has been added: ${request.body.first_name} ${request.body.last_name}`
    )
  } catch (err) {
    response.status(404).send(err)
  }
})

// update first name in users table
app.patch('/api/users/update/:id', async function (request, response) {
  try {
    const updateUser = parseInt(request.params.id)
    await db.any(`UPDATE users SET first_name=$<first_name> WHERE id=${updateUser}`, request.body)

    return response.send(
      `The following user id name has been updated: ${updateUser}`
    )
  } catch (err) {
    response.status(404).send(err)
  }
})

app.delete('/api/users/delete/:id', async function (request, response) {
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

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
