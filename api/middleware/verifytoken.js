const jwt = require('jsonwebtoken');

const verifyToken = async  (req, res, next) =>{
    const authHeader = req.headers["authorization"]
    if(! authHeader) {
       return next(new Error(`no token provied`))
    }
    const bearer = authHeader.split(' ')
    const bearerToken = bearer[1]
    if(bearerToken === undefined){
        return next(new Error(`Sorry token is undefined so you do not have access to this page!`))
    }
    try {
        const decodedToken = await jwt.verify(bearerToken, 
        process.env.RANDOM_TOKEN);
        req.userId = decodedToken.data[0].user_id
        next()
    } catch (err) {
        console.log(err)
       next(err)
    }    
}
module.exports = verifyToken