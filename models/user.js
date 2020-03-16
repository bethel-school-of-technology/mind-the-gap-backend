var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Mongoose automatically add _id property to schemas, don't add it yourself.
var userSchema = new Schema({
    first_name : String,
    last_name : String,
    email : String,
    updated : {type: Date, default: Date.now() }
});

//compile model from schema
var user = mongoose.model('User', userSchema);

module.exports = mongoose.model('User', userSchema);

// var fullname = '';

//   if (this.first_name && this.family_name) {
//     fullname = this.family_name + ', ' + this.first_name
//   }
//   if (!this.first_name || !this.family_name) {
//     fullname = '';
//   }

//   return fullname;
// });