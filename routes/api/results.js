var express = require('express');
var route = express.Router();

var Response = require('../../models/response');
var User = require('../../models/user');

// Get responses by assessment id and user id
route.get('/response/:assessment_id', function (req, res) {
    answerOptionArray = any,
        Response.find({ asessment_id: req.body.assessment_id, user_id: req.body.user_id }, function (err, doc) {

            if (err) 
            {
                res.send(err);
            }
                console.log(doc);
                res.json(doc);
            
            // identify which bucket received the most responses 
            //     {
            //         Question.findeOne({_id: response.question_id}){
            //             answerOptionArray
            //         }
            //     }
            // })
        });
});


// var Response: {
//     new (doc?: any): Document;
//     watch(pipeline?: object[], options?: ChangeStreamOptions & {
//         session?: ClientSession;
//     }): ChangeStream;
//     ... 61 more ...;
//     schema: Schema<...>;
// }