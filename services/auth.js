const jwt = require('jsonwebtoken');
const User = require('../models/user');

var authService = {
  signUser: function(user) {
    const token = jwt.sign(
      {
        email : user.email,
        _id : user._id
      },
      'secretkey',
      {
        expiresIn: '1h'
      }
    );
    return token;
  }
}

module.exports = authService;