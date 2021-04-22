const nodeMailer = require('nodemailer')

let mailer = nodeMailer.createTransport({
    service:'gmail',
    auth:{
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

/**
 * Send an email to a user
 * 
 * @param {Object} email 
 */
function sendEmail(email) {
    mailer.sendMail(email, (err, info) => {
        if(err) {
            console.log('error in sending mail', err)
            throw err;
        }
        console.log('Email successfully sent!',info)
    })
}


module.exports = {
    mailer,
    sendEmail
};