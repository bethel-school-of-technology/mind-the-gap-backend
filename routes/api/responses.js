var express = require('express');
var mongoose = require('mongoose');
var route = express.Router();

// Response Model
var Response = require('../../models/response');
var Question = mongoose.model('Question');

// Get all responses
route.get('/', function (req, res) {
    Response.find(function (err, doc) {
        if (err) return next(err);
        res.json(doc);
    });
});

// Get response by ID 
route.get('/:id', function (req, res) {
    Response.findById(req.params.id, (err, doc) => {
        if (err) {
            return next(err)
        } else {
            res.json(doc)
        }
    });
});

// Get response by user id

// Get response by assessment id


// Post response 
route.post('/', async (req, res) => {
    try {
        // console.log("Response Body:");
        // console.log(req.body);
        // console.log("Request Body answer_options");
        // console.log(req.body.answer_option_id);
        for (answer in req.body.answer_option_id) {
            // console.log("Entered The Loop");
            // console.log("Answer:");
            // console.log(answer);
            // console.log("answer value:");
            // console.log(req.body.answer_option_id[answer]);
            var user_answer = req.body.answer_option_id[answer];
            await Question.findOne({ 'answer_options._id': user_answer }, async function (err, result) {
                // console.log("Question Id:");
                // console.log(result._id);
                let response = new Response({
                    user_id: req.body.user_id,
                    question_id: result._id,
                    assessment_id: req.body.assessment_id,
                    answer_option_id: req.body.answer_option_id[answer]
                })

                console.log("Answer choice ID:");
                console.log(req.body.answer_option_id[answer]);
                await response.save();


            })

        }
    } catch (err) {
        console.log(err);
    }
    res.status(201).json("Successfully saved your answers!");
});

// Get Response via user_id
route.post('/:user_id', async (req, res) => {
    try {
        await Response.findOne({user_id: req.params.user_id}, async function (err, result) {
            if (result) {
                console.log("result:")
                console.log(result);
                return res.status(200).json(result);
            } else {
                return res.status(200).json("No Assessment Taken");
            }
        })
    } catch (err) {
        console.log(err);
        res.json(err);
    }  
});

// Update response
route.put('/:id', function (req, res) {
    var updateResponse = req.body;
    delete updateResponse._id;

    Response.find({ _id: req.params.id }).updateOne({ _id: req.params.id }, updateResponse, function (err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to update response");
        } else {
            updateResponse._id = req.params.id;
            res.status(200).json(updateResponse);
        }
    });
});

// Delete response
route.delete('/:id', function (req, res) {
    Response.find({ _id: req.params.id }).deleteOne({ _id: req.params.id }, function (err, result) {
        if (err) {
            handleError(res, err.message, "Failed to delete response");
        } else {
            res.status(200).json("Successfully deleted response with id:" + req.params.id);
        }
    });
});

module.exports = route;