var express = require('express');
var router = express.Router();
var User = require('../../models/user');


/* GET users listing. */
//http://localhost:5000/api/users
router.get('/', function(req, res) {
  User.find(function(err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

/* GET an user by id listing. */
//http://localhost:5000/api/users/<id>
router.get('/:id', (req, res) => {
  User.find({_id: req.params.id}, (err, user) => {
    if (err) return next(err);
    res.json(user);
  });
});


//Create Action
//http://localhost:5000/api/users
router.post('/', function (req, res) {
   User.create({ 
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
//http://localhost:5000/api/users/<id>
router.put('/:id', function (req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  User.find({_id: req.params.id}).updateOne({_id: req.params.id}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update user");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

//Delete Action
//http://localhost:5000/api/users/<id>
router.delete('/:id', function (req, res) {
  User.find({_id: req.params.id}).deleteOne({_id: req.params.id}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete user");
    } else {
      res.status(200).json("Successfully deleted User with id:" + req.params.id);
    }
  });
});

module.exports = router;
