var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Response Schema Table
var Response = new Schema({
    user_id: String,
    assessment_id: String,
    question_id: String,
    answer_option_id: String, 
    updated : {type: Date, default: Date.now() }
});

//Make Schema additions/Changes below in production



//END OF SCHEMA ADDITIONS


module.exports = mongoose.model('Response', Response);