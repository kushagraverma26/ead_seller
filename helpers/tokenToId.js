var config = require('../config/secret');
var jwt = require('jsonwebtoken');

//Gives user ID from token
module.exports = function (token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err)
        reject(err);
      resolve(decoded.id);
    })
  })

}
