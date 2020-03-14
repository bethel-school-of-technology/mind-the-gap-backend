const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Question = new Schema({
    id: {
        type: number
    },    
    
    name: {
        type: String
    },
    answer1: {
        type: String
    },
    answer2: {
        type: String
    },
    answer3: {
        type: String
    },
    answer4: {
        type: String
    },
    answer5: {
        type: String
    }
}, {
    collection: 'questions'
})

module.exports = mongoose.model('Question', Question)