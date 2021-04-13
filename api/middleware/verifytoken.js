const jwt = require('jsonwebtoken');

//FORMAT OF TOKEN
//AUTHORIZATION: Bearere <access_token>
const verifyToken = (req, res, next) =>{
    //Get auth header value
    const bearerHeader = req.headers['cookie']
    //Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
        //Split at the space
        const bearer = bearerHeader.split('=')
        //Get token from array
        const bearerToken = bearer[1]
        //Set the token
        req.token = bearerToken
        next()
    }else{
        res.sendStatus(403)
    }
}

module.exports = verifyToken