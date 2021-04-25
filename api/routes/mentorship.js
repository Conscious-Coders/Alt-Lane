const express = require('express')
const router = express.Router()
const db = require('../db')
const verifyToken = require('../middleware/verifytoken')
const randomToken = require('uuid-random')
const { sendEmail } = require('../mailer')

router.get('/', verifyToken, async function (request, response){
  try{
    const data = await db.any('SELECT * FROM mentorship')

    return response.json({
      data: data
    })
  }catch(err){
    console.log(err)
    response.status(500).json(err)
  }
})

//Returns all mentors associated with a single mentee
//Is used as a Get Method request
router.post('/get_mentees_for_mentor', verifyToken, async function (request, response) {
    try {
      const mentor = parseInt(request.body.mentor_id)
      const data = await db.any(`SELECT users.first_name, users.last_name, users.photo_url, career_fields.name FROM mentorship 
                                        JOIN users ON mentee_id = users.user_id
                                        JOIN mentee_interests ON mentee_interests.mentee_id = mentorship.mentee_id
                                        JOIN career_fields ON mentee_interests.career_field_id = career_fields.id                    
                                            WHERE mentorship.mentor_id = ${mentor}`)
      return response.json({
        data: data
      })
    } catch (err) {
      console.log(err)
      response.status(500).json(err)
    }
})


//Returns all mentors associated with a single mentee
//Is used as a Get Method request
router.post('/get_mentors_for_mentee', verifyToken, async function (request, response) {
    try {
      const mentee = parseInt(request.body.mentee_id)
      const data = await db.any(`SELECT users.first_name, users.last_name, users.photo_url, mentors.bio, career_fields.name, mentorship.status FROM mentorship
                                                               JOIN users ON mentorship.mentor_id = users.user_id
                                                               JOIN mentors ON mentorship.mentor_id = mentors.mentor_id
                                                               JOIN career_fields ON mentors.career_field_id = career_fields.id 
                                                                      WHERE mentorship.mentee_id = ${mentee}`)
      return response.json({
        data: data
      })
    } catch (err) {
      console.log(err)
      response.status(500).json(err)
    }
})

router.post('/verify-emailToken', async function(req, res){
  const mentee_id = req.body.mentee_id
  const mentor_id = req.body.mentor_id
  const emailToken = req.body.token
  try{

    const dbToken = await db.one(`SELECT temp_token from mentorship where mentee_id = ${mentee_id} and mentor_id=${mentor_id}`)
     if(emailToken === dbToken.temp_token){
      await db.none(`UPDATE mentorship SET status = 'active', temp_token= null WHERE mentee_id=${mentee_id} AND mentor_id = ${mentor_id}`)
      return res.send('Success')
    }
    
  }catch(err){
    res.status(500).json(err)
  }
})

router.post('/', verifyToken, async function (request, response) {
  const menteeId = parseInt(request.userId)
  const mentorId = parseInt(request.body.mentor_id)
  const emailToken = randomToken()
  try {
    await db.none(`INSERT INTO mentorship (mentor_id, mentee_id, status, temp_token) VALUES (${mentorId}, ${menteeId}, 'pending', '${emailToken}')`)
    const parentEmail = await db.one(`SELECT parent_email from mentees WHERE mentee_id = ${menteeId}`)
    const menteeName = await db.any(`SELECT first_name from users WHERE user_id=${menteeId}`)
    const mentor_info = await db.any(`SELECT users.first_name, users.last_name, users.photo_url, mentors.bio, mentors.company, mentors.linkedin_url, career_fields.name FROM users 
    JOIN mentors ON users.user_id = mentors.mentor_id 
    JOIN career_fields ON mentors.career_field_id = career_fields.id 
    WHERE mentor_id = ${mentorId}`)
    const firstName = mentor_info[0].first_name
    const lastName = mentor_info[0].last_name
    const photo = mentor_info[0].photo_url
    const bio = mentor_info[0].bio
    const company = mentor_info[0].company
    const linkedInProfile = mentor_info[0].linkedin_url
    const careerField = mentor_info[0].name
    const menteeFirstName = menteeName[0].first_name
    const emailLinkUrl = process.env.NODE_ENV === 'production' ? 'https://alt-lane.netlify.app' : 'http://localhost:3000'

    const emailData = {
      to: parentEmail.parent_email, 
      from: process.env.EMAIL,
      subject: `Please verify ${menteeFirstName}'s Mentor`, 
      html: 
      `<head>
      <style>
        .card {
          box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
          background: linear-gradient(360deg, #B2C3EE 20%, #D6C5F9 90%);
          transition: 0.3s;
          border-radius: 5px; 
          width: 30%;
          text-align: center;
          margin: 0 auto
        }
        
         img {
          border-radius: 5px 5px 0 0;
          width: 80%;
        }
        .card:hover {
          box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
        }
        .container {
          padding: 2px 16px;
          width: 80%;
          font-family: Chivo, sans-serif;
          text-align: center;
          margin: 0 auto
        }

      </style>
      </head>
      <h1 style='text-align:center;'>Please click the link below to approve ${menteeFirstName}'s mentorship request:</h1>
      <center>
      <a href="${emailLinkUrl}/verify-emailToken/${menteeId}/${mentorId}/${emailToken}" style="font-size: 20px;">Confirm Mentor</a>
      </center>
      <h1 style='text-align: center;'>${menteeFirstName} chose the following mentor:</h1> 
      <div class='card'>
      <img src='${photo}' alt='Mentor pic'/>
        <div class='container'>
          <h2><b>${firstName} ${lastName}</b></h2>
          <h3>${careerField}</h3> 
          <h3>${bio}</h3>
          <h3><b>${company}</b><h3>
          <a href="${linkedInProfile}">Check out my LinkedIn!</a>   
        </div>
      </div>`
    }
    sendEmail(emailData)

    return response.sendStatus(200)
  } catch (err) {
    console.log(err)
    return response.status(500).json({
      message: err.message
    })
  }
})


router.put('/', verifyToken, async function (request, response) {
  const mentee = parseInt(request.body.mentee_id)
  const mentor = parseInt(request.body.mentor_id)
        try {
        await db.none(`UPDATE mentorship SET status = 'active', temp_token= null WHERE mentee_id=${mentee} AND mentor_id = ${mentor}`)
        return response.sendStatus(200)
      } catch (err) {
        console.log(err)
        response.status(500).json(err)
      }
    })
 


router.patch('/', verifyToken, async function (request, response) {
  const mentee = parseInt(request.body.mentee_id)
  const mentor = parseInt(request.body.mentor_id)
        try {

        await db.none(`UPDATE mentorship SET status='active', temp_token=null WHERE mentee_id=${mentee} AND mentor_id=${mentor}`)
        return response.sendStatus(200)
      } catch (err) {
        console.log(err)
        response.status(500).json(err)
      }
    })




router.delete('/', verifyToken, async function (request, response) {
  const mentee = parseInt(request.body.mentee_id)
  const mentor = parseInt(request.body.mentor_id)
        try {

        await db.none(`DELETE FROM mentorship WHERE mentee_id=${mentee} AND mentor_id=${mentor}`)
        return response.sendStatus(200)
      } catch (err) {
        console.log(err)
        response.status(500).json(err)
      }
    })

module.exports = router