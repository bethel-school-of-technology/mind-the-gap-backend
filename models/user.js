var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//User Schema Table
//Mongoose automatically add _id property to schemas, don't add it yourself.
var UserSchema = new Schema({
    first_name : String,
    last_name : String,
    username : String,
    email : String,
    updated : {type: Date, default: Date.now() }
});

//Make Schema additions/Changes below when in production



//END OF SCHEMA ADDITIONS

//METHODS
UserSchema.methods.fullName = function() {
    fullName = this.first_name + ' ' + this.last_name;
    return fullName;
  };


mongoose.model('User', UserSchema);