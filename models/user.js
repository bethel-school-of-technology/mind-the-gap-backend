var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//User Schema Table
//Mongoose automatically add _id property to schemas, don't add it yourself.
const User = new Schema({
    first_name : String,
    last_name : String,
    email : String,
    updated : {type: Date, default: Date.now() }
});

//Make Schema additions/Changes below when in production



//END OF SCHEMA ADDITIONS

//METHODS
User.methods.fullName = function() {
    fullName = this.first_name + ' ' + this.last_name;
    return fullName;
  };

//exports to app
module.exports = mongoose.model('User', User);