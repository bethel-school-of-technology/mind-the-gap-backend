var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Question Schema Table
var Question = new Schema({
    name: String,
    question_order: Number,
    question_text: String,
    question_type: String,
    assessment_id: String,
    updated : {type: Date, default: Date.now() }

});


//Make Schema additions/Changes below in production



//END OF SCHEMA ADDITIONS


module.exports = mongoose.model('Question', Question);