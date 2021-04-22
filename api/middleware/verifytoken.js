const jwt = require('jsonwebtoken');

const verifyToken = async  (req, res, next) =>{
    const authHeader = req.headers["authorization"]
    if(! authHeader) {
       return next(new Error(`no token provied`))
    }
    const bearer = authHeader.split(' ')
    const bearerToken = bearer[1]
    try {
        const decodedToken = await jwt.verify(bearerToken, process.env.RANDOM_TOKEN);
        console.log(decodedToken, 'verify token line 23')
        req.userId = decodedToken.data[0].user_id
        next()
    } catch (err) {
        console.log(err)
       next(err)
    }    
}
module.exports = verifyToken