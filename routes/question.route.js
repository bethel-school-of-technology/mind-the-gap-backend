const express = require('express');
const app = express();
const questionRoute = express.Router();

//Question model
let Question = require('../models/Question');

//Get All Questions
questionRoute.route('/').get((req, res) => {
    Question.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

//Get single Quesiton
questionRoute.route('/read/:id').get((req, res) => {
    Question.findById(req.params.id, (error, data) => {
        if (error) {
            return next(eror)
        } else {
            res.json(data)
        }
    })
})

module.exports = questionRoute;