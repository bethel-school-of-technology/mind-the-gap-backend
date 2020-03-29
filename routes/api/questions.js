var express = require('express');
var questionRoute = express.Router();

//Question model
var Question = require('../../models/Question');

//Get All Questions
questionRoute.get('/', function(req, res) {
    Question.find(function(err, data) {
        if (err) return next(err);
        res.json(data);
    });
});

//Get single Quesiton
questionRoute.get('/:id', function(req, res) {
    Question.findById(req.params.id, (err, data) => {
        if (err) {
            return next(err)
        } else {
            res.json(data)
        }
    });
});

//Post Single Question
questionRoute.post('/', function(req, res, next) {
    Question.create({
        name: req.body.name,
        question_order: req.body.question_order,
        question_text: req.body.question_text,
        question_type: req.body.question_type,
        answer_option: req.body.answer_option,
        answer_bucket: req.body.answer_bucket,
        assessment_id: req.body.assessment_id,
    }, 
    function(err, data) {
        if (err) return next(err);
        res.json(data);
    });   
});

//Update Action
questionRoute.put('/:id', function(req, res) {
    var updateQuestion = req.body;
    delete updateQuestion._id;

    Question.find({_id: req.params.id}).updateOne({_id: req.params.id}, updateQuestion, function(err, data) {
        if (err) {
            handleError(res, err.message, "Failed to update question");
        } else {
            updateQuestion._id = req.params.id;
            res.status(200).json(updateQuestion);
        }
    });
});

//Delete Action
questionRoute.delete('/:id', function (req, res) {
    Question.find({_id: req.params.id}).
    deleteOne({_id: req.params.id}, function(err, result) {
        if(err) {
            handleError(res, err.message, "Failed to delete quesiton");
        } else {
            res.status(200).json("Successfully deleted Question with id:" + req.params.id);
        }
    });
});

module.exports = questionRoute;