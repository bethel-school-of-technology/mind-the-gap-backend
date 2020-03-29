var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var jwt = require('jsonwebtoken');


//User Schema Table
//Mongoose automatically add _id property to schemas, don't add it yourself.
const User = new Schema({
    first_name : String,
    last_name : String,
    email : String,
    password : String,
    updated : {type: Date, default: Date.now() }
});

//Make Schema additions/Changes below when in production



//END OF SCHEMA ADDITIONS

//METHODS
User.methods.fullName = function() {
    fullName = this.first_name + ' ' + this.last_name;
    return fullName;
  };

//salt & hash
User.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  };

//validating password
User.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
  };
//JWT 
  User.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
  
    return jwt.sign({
      _id: this._id,
      email: this.email,
      name: this.name,
      exp: parseInt(expiry.getTime() / 1000),
    }, "MY_SECRET"); 
  };  


  


//exports to app
module.exports = mongoose.model('User', User);