const bcrypt = require('bcrypt')

const verifyPass = (loginpw, dbpw) => {
   return bcrypt.compareSync(loginpw, dbpw);

}

module.exports = verifyPass