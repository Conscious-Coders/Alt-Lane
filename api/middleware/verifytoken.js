const jwt = require('jsonwebtoken');

//FORMAT OF TOKEN
//AUTHORIZATION: Bearere <access_token>
const verifyToken = async  (req, res, next) =>{
    //Get auth header value
    const authHeader = req.headers["authorization"]

    if(! authHeader) {
       return  res.status(403).json({message:"Not Aurthorized"})
    }
    // Bearer Token
    //Check if bearer is undefined
   
    //Split at the space
    const bearer = authHeader.split(' ')
    //Get token from array
    const bearerToken = bearer[1]

    try {
        const decodedToken = await jwt.verify(bearerToken, 'secretKey');
        //Set the token
       
        //req.token = bearerToken
        req.userId = decodedToken.data[0].user_id
        next()
    } catch (err) {
        return res.status(403).json({
            message: 'Was this token tampered with'
        })
    }    
}

module.exports = verifyToken