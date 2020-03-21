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
router.delete('/:id', function (req, res) {
  db.collection(CONTACTS_COLLECTION).deleteOne({_id: req.params.id}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete contact");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

module.exports = router;
