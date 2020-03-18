const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Question = new Schema({
    name: {
        type: String
    },
    question_order: {
        type: String
    },
    question_statement: {
        type: String
    },
    question_type: {
        type: String
    },
    assessment_id: {
        type: Number
    },
    updated_at: {
        type: Timestamp
    },

}, {
    collection: 'questions'
})

module.exports = mongoose.model('Question', Question)