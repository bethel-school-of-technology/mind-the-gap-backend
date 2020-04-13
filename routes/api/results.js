var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var Response = require('../../models/response');
var User = mongoose.model('User');
var Question = mongoose.model('Question');

// router.get('/', function (req, res) {
//     Response.find(function (err, doc) {
//         if (err) res.send(err);
//         res.json(doc);
//     });
// });

//Get responses by assessment id and user id
router.get('/', function (req, res) {
    // const answerOptionArray = any,
    Response.find({ assessment_id: req.body.assessment_id, user_id: req.body.user_id }, function (err, responses) {
        console.log('assessment id: ');
        console.log('Resonse Array:');
        console.log(responses);
        responses.forEach(response => {
           Question.findOne({_id: response.question_id}), function(err, question) {
               console.log('got to question');
               console.log(question);
           } 
        });

        if (err) {
            res.send(err);
        }
        console.log(doc);
        res.json(doc);

        //     identify which bucket received the most responses 
        //         {
        //             Question.findeOne({_id: response.question_id}){
        //                 answerOptionArray
        //             }
        //         }
        //     })
    });
});

//experimenting with route
// router.get('/:assessment_id/:user_id', function (req, res) {
//     find({ assessment_id: req.params.assessment_id, user_id: req.params.user_id })
//         .then(result => {
//             if (result) {
//                 res.render('response', {
//                     asessment_id: result.assessment_id,
//                     user_id: result.user_id,
//                 });
//             } else {
//                 res.send('result not found');
//             }
//         });
// });


module.exports = router;
