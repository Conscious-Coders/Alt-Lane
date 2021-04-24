/* eslint-disable no-multiple-empty-lines */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-unused-vars */
require('dotenv').config()
// pull in node's http module
const http = require('http')
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const usersRouter = require('./routes/users')
const careersRouter = require('./routes/career_fields')
const menteesRouter = require('./routes/mentees')
const mentorsRouter = require('./routes/mentors')
const mentee_interestsRouter = require('./routes/mentee_interests')
const mentorshipRouter = require('./routes/mentorship')
const setupSocketIO = require('./socket')
const app = express()
require('socket.io')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(cors({origin: '*', credentials: true, methods:['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']}))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/users', usersRouter)
app.use('/careers', careersRouter)
app.use('/mentees', menteesRouter)
app.use('/mentors', mentorsRouter)
app.use('/mentee_interests', mentee_interestsRouter)
app.use('/mentorship', mentorshipRouter)



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log('line 52 error')
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

// create out server that we'll ultimately export
const server = http.createServer(app) 

/**
 * Configure socket.io on server
 */
 setupSocketIO(server)

module.exports = server
