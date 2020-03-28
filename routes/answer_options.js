// var express = require('express');
// var route = express.Router();

// //Answer_option model
// var Answer_option = require('../models/answer_option');

// //Get All Answer_options
// route.get('/', function(req, res) {
//     Answer_option.find(function(err, data) {
//         if (err) return next(err);
//         res.json(data);
//     });
// });

// //Get single Answer_option
// route.get('/:id', function(req, res) {
//     Answer_option.findById(req.params.id, (err, data) => {
//         if (err) {
//             return next(err)
//         } else {
//             res.json(data)
//         }
//     });
// });

// //Post Single Answer_option
// route.post('/', function(req, res, next) {
//     Answer_option.create({
//         question_id: req.body.question_id,
//         option_text: req.body.option_text,
//         score: req.body.score,
//     }, 
//     function(err, data) {
//         if (err) return next(err);
//         res.json(data);
//     });   
// });

// //Update Action
// route.put('/:id', function(req, res) {
//     var updateAnswer = req.body;
//     delete updateAnswer._id;

//     Answer_option.find({_id: req.params.id}).updateOne({_id: req.params.id}, updateAnswer, function(err, data) {
//         if (err) {
//             handleError(res, err.message, "Failed to update answer_option");
//         } else {
//             updateAnswer._id = req.params.id;
//             res.status(200).json(updateAnswer);
//         }
//     });
// });

// //Delete Action
// route.delete('/:id', function (req, res) {
//     Answer_option.find({_id: req.params.id}).
//     deleteOne({_id: req.params.id}, function(err, result) {
//         if(err) {
//             handleError(res, err.message, "Failed to delete answer_option");
//         } else {
//             res.status(200).json("Successfully deleted answer_option with id:" + req.params.id);
//         }
//     });
// });

// module.exports = route;