var express = require('express');
var router = express.Router();
var User = require('../../models/user');
var authService = require('../../controllers/authentication');



/* GET users listing. */
router.get('/', function(req, res) {
  User.find(function(err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

/* GET an user by id listing. */
router.get('/:id', (req, res) => {
  User.find({_id: req.params.id}, (err, user) => {
    if (err) return next(err);
    res.json(user);
  });
});
// Create new user if one doesn't exist
router.post('/signup', function(req, res, next) {
    const newUser = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password
    })
    newUser.save().then(rec => {
      res.status(201).json(rec);
    })
    
  });

// Login user and return JWT as cookie
router.post('/login', function (req, res, next) {
    User.findOne({email: req.body.email}).then(rec => {
      if(!rec) {
        return res.status(401).json({message: 'Invalid username or password'})
      }
      if(rec.password != res.body.password) {
        return res.status(401).json({message: 'Invalid username or password'})
      }
      res.status(200).json(rec)
    })
  });
  
  router.get('/users', (req, res) => {
    User.find().then(rec => {
      res.status(200).json(rec)
    })
  });
  

//Create Action
//url: http://localhost:5000/api/users?first_name=Test&last_name=User&email=example@gmail.com
/*router.post('/', function (req, res) {
   User.create({ 
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  }, 
  function(err, doc) {
    if (err) return next(err);
    res.json(doc);
  });
});*/

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
  User.find({_id: req.params.id}).deleteOne({_id: req.params.id}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete user");
    } else {
      res.status(200).json("Successfully deleted User with id:" + req.params.id);
    }
  });
});

module.exports = router;
