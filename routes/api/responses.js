var express = require('express');
var route = express.Router();

// Response Model
var Response = require('../../models/response');

// Get all respnoses
route.get('/', function(req, res) {
    Response.find(function(err, doc) {
        if (err) return next(err);
        res.json(doc);
    });
});

// Get response by ID 
route.get('/:id', function(req, res) {
    Response.findById(req.params.id, (err, doc) => { 
        if (err) {
            return next (err)
        } else {
            res.json(doc)
        }
    });
});

// Get response by user id

// Get response by assessment id

// Post response 
route.post('/', function(req, res) {
    Response.create({
    user_id: req.body.user_id,
    assessment_id: req.body.assessment_id,
    question_id: req.body.question_id,
    answer_option_id: req.body.answer_option_id,
    response: req.body.response, 
    }, 
    function(err, doc) {
        if (err) return next(err);
        res.json(doc);
    });
});

// Update response
route.put('/:id', function(req, res) {
    var updateResponse = req.body;
    delete updateResponse._id;
    
    Response.find({_id: req.params.id}).updateOne({_id: req.params.id}, updateResponse, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to update response");
        } else {
            updateResponse._id = req.params.id;
            res.status(200).json(updateResponse);
        }
    });
});

// Delete response
route.delete('/:id', function(req, res) {
    Response.find({_id: req.params.id}).deleteOne({_id: req.params.id}, function(err, result) {
        if(err) {
            handleError(res, err.message, "Failed to delete response");
        } else {
            res.status(200).json("Successfully deleted response with id:" + req.params.id);
        }
    });
});

module.exports = route;