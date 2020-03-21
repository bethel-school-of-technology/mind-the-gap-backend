var express = require('express');
var router = express.Router();
var User = require('../../models/user');


/* GET users listing. */
router.get('/', function(req, res) {
  User.find(function(err, doc) {
    if (err) return next(err);
    res.send("Got Here!");
  });
});

/* GET an user by id listing. */
router.get('/:id', (req, res) => {
  User.find({_id: req.params.id}, (err, user) => {
    if (err) return next(err);
    res.json(user);
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
router.put('/:id', function (req, res) {
  res.json('Got a PUT request at /user')
});

//Delete Action
router.delete('/:id', function (req, res) {
  res.json('Got a DELETE request at /user')
});

module.exports = router;
