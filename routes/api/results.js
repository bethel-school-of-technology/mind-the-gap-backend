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
router.post('/', async function (req, res) {

    console.log("run function begin:");
    const answerOptionArray = [];

    async function run() {
        // await buildArray();
        // await buildResult();
        // sendResult();

        buildArray().then(() => buildResult(answerOptionArray)).then(() => sendResult(answerOptionArray));
    }

    function buildArray() {
        console.log("Start Build Array")
        return new Promise(resolve => {
            Response.find({ assessment_id: req.body.assessment_id, user_id: req.body.user_id }, function (err, responses) {
                // console.log('assessment id: ');
                // console.log(req.body.assessment_id);
                // console.log("Response Array:");
                // console.log(responses);
                responses.forEach(async response => {
                    // console.log("Got a Response:");
                    // console.log(response);
                    // let user_response = await Question.findOne({_id: response.question_id, 'answer_options._id': response.answer_option_id});
                    let user_response = await Question.findOne({ 'answer_options._id': response.answer_option_id });
                    // console.log("Response Spacer:");
                    // console.log(user_response);
                    //console.log(user_response.answer_options);
                    user_response.answer_options.forEach(answer_option => {
                        if (answer_option._id == response.answer_option_id) {
                            // console.log(answer_option.answer_bucket);
                            answerOptionArray.push(answer_option.answer_bucket);
                            console.log("Array build in process");
                            console.log(answerOptionArray);
                        }
                    });
                    console.log("array length compare:");
                    console.log(answerOptionArray.length);
                    console.log(responses.length);
                    if (answerOptionArray.length < responses.length) {
                        console.log("Building Array....");
                    } else {
                        console.log("Array Built:");
                        console.log(answerOptionArray);
                        resolve(answerOptionArray);
                    }
                });

            });
        });
    }

    function buildResult(answerOptionArray) {
        try {
            return new Promise(resolve => {
                console.log("Build Result:");
                console.log(answerOptionArray);
                var bucketOne = 0;
                var bucketTwo = 0;
                var bucketThree = 0;
                var bucketFour = 0;
                var bucketFive = 0;

                answerOptionArray.forEach(async answer => {
                    if ("Bucket One" == answer) {
                        bucketOne += 1;
                    }

                    if ("Bucket Two" == answer) {
                        bucketTwo += 1;
                    }

                    if ("Bucket Three" == answer) {
                        bucketThree += 1;
                    }

                    if ("Bucket Four" == answer) {
                        bucketFour += 1;
                    }

                    if ("Bucket Five" == answer) {
                        bucketFive += 1;
                    }
                    //build results here
                    resolve();
                });
                    console.log("Bucket Values:")
                    console.log(bucketOne);
                    console.log(bucketTwo);
                    console.log(bucketThree);
                    console.log(bucketFour);
                    console.log(bucketFive);
                    if ( bucketOne >= bucketTwo ) {
                        return res.json ('Bucket One');
                    }
                    else if ( bucketTwo >= bucketThree ) {
                        return res.json ('Bucket Two');
                    }
                    else if ( bucketThree >= bucketFour ) {
                        return res.json ('Bucket Three');
                    }
                    else if ( bucketFour >= bucketFive ) {
                        return res.json ('Bucket Four');
                    }
                    else {
                        return res.json ('Bucket Five');
                    }
            });
        } catch (err) {
            console.log(err);
        }
    }

    function sendResult(answerOptionArray) {
        console.log("Array Values:");
        console.log(answerOptionArray);
        console.log("Here is your array End of Route!");
        // res.json("Got Here!")
    }

    run();
});



// function matchBucket1() {
//     var bucket1 = "Bucket One";
//     if (bucket1 == )
//         var result1 = bucket1.match(/eek/i);
//     // document.write("Output : " + result1); 
// } matchBucket1();

// function matchBucket2() {
//     var bucket2 = "Bucket Two";
//     var result2 = bucket2.match(/eek/i);
//     document.write("Output : " + result2);
// } matchBucket2();

// function matchBucket3() {
//     var bucket3 = "Bucket Three";
//     var result3 = bucket3.match(/eek/i);
//     document.write("Output : " + result3);
// } matchBucket3();

// function matchBucket4() {
//     var bucket4 = "Bucket Four";
//     var result4 = bucket4.match(/eek/i);
//     document.write("Output : " + result4);
// } matchBucket4();

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
