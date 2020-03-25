var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Response Schema Table
var Response = new Schema({
    user_id: Number,
    assessment_id: Number,
    question_id: Number,
    answer_option_id: Number, 
    response: Boolean,
    updated : {type: Date, default: Date.now() }
});

//Make Schema additions/Changes below in production



//END OF SCHEMA ADDITIONS


module.exports = mongoose.model('Response', Response);