var express = require('express');
var router = express.Router();
var User = require('../../models/user');


/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find(function(err, docs) {
    if (err) return next(err);
    res.send(docs);
  });
});

/* GET an user by id listing. */
router.get('/', function(req, res, next) {
  User.find(function(err, docs) {
    if (err) return next(err);
    res.json(docs);
  });
});


//Create Action
//url: http://localhost:5000/api/users?first_name=Test&last_name=User&email=example@gmail.com
router.post('/', function (req, res) {
  const user_one = User.create({ 
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  }, 
  function(err, doc) {
    if (err) return next(err);
    res.json(doc);
  });
});

//Update Action
router.put('/user', function (req, res) {
  res.json('Got a PUT request at /user')
});

//Delete Action
router.delete('/user', function (req, res) {
  res.json('Got a DELETE request at /user')
});

module.exports = router;
