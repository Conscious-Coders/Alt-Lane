const jwt = require('jsonwebtoken');
const randomToken = require('uuid-random')

//FORMAT OF TOKEN
//AUTHORIZATION: Bearer <access_token>
const verifyToken = async  (req, res, next) =>{
  
    //Get auth header value
    const authHeader = req.headers["authorization"]

    if(! authHeader) {
       return next(new Error(`no token provied`))
    }
    
    // Bearer Token
    //Check if bearer is undefined
   
    //Split at the space
    const bearer = authHeader.split(' ')
    //Get token from array
    const bearerToken = bearer[1]

    try {
        const decodedToken = await jwt.verify(bearerToken, 'secretKey');
        console.log(decodedToken, 'verify token line 23')
        req.userId = decodedToken.data[0].user_id
        next()
    } catch (err) {
        console.log(err)
       next(err)
    }    
}

module.exports = verifyToken