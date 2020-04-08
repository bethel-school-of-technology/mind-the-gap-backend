const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require("bcryptjs");

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
  },

  comparePasswords: function (plainTextPassword, hashedPassword) {
    return bcrypt.compareSync(plainTextPassword, hashedPassword)
  },

  hashPassword: function(plainTextPassword) {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(plainTextPassword, salt);
    return hash;
  }
  
};

module.exports = authService;