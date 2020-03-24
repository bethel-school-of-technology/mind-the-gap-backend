var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Assessment Schema Table
var Assessment = new Schema({
    title: String,
    description: String,
    assessment_type: String,
    updated : {type: Date, default: Date.now() }
});

//Make Schema additions/Changes below in production



//END OF SCHEMA ADDITIONS


module.exports = mongoose.model('Assessment', Assessment);