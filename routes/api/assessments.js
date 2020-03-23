var express = require('express');
var route = express.Router();

// Assessment Model
var Assessment = require('../../models/assessment');

// Get all assessments
route.get('/', function(req, res) {
    Assessment.find(function(err, doc) {
        if (err) return next(err);
        res.json(doc);
    });
});

// Get assessments by ID 
route.get('/:id', function(req, res) {
    Assessment.findById(req.params.id, (err, doc) => { 
        if (err) {
            return next (err)
        } else {
            res.json(doc)
        }
    });
});

// Post assessment 
route.post('/', function(req, res) {
    Assessment.create({
    title: req.body.title,
    description: req.body.description,
    assessment_type: req.body.assessment_type,
    }, 
    function(err, doc) {
        if (err) return next(err);
        res.json(doc);
    });
});

// Update assessment
route.put('/:id', function(req, res) {
    var updateAssessment = req.body;
    delete updateAssessment._id;
    
    Assessment.find({_id: req.params.id}).updateOne({_id: req.params.id}, updateAssessment, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to update assessment");
        } else {
            updateAssessment._id = req.params.id;
            res.status(200).json(updateAssessment);
        }
    });
});

// Delete assessment
route.delete('/:id', function(req, res) {
    Assessment.find({_id: req.params.id}).deleteOne({_id: req.params.id}, function(err, result) {
        if(err) {
            handleError(res, err.message, "Failed to delete assessment");
        } else {
            res.status(200).json("Successfully deleted assesment with id:" + req.params.id);
        }
    });
});

module.exports = route;


