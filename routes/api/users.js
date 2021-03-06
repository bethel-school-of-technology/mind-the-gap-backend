var express = require('express');
var router = express.Router();
var User = require('../../models/user');
var authService = require('../../services/auth');



/* GET users listing. */
router.get('/', function (req, res) {
  User.find(function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

/* GET an user by id listing. */
//OLD LOGIC 
// router.get('/:id', (req, res) => {
//   User.find({_id: req.params.id}, (err, user) => {
//     if (err) return next(err);
//     res.json(user);
//   });
// });

router.get('/profile/:id', function (req, res, next) {
  // console.log("Parameters:");
  // console.log(req.params.id);
  User.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) {
      return next(err)
    } else {
      // console.log("User info:");
      //   console.log(doc);
      res.json(doc);
    }
  });
});

// Create new user if one doesn't exist
router.post('/signup', function (req, res, next) {
  const newUser = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: authService.hashPassword(req.body.password),
  })
  newUser.save().then(rec => {
    res.status(201).json(rec);
  })
});

router.get('/signup', function (req, res, next) {
  res.render('/signup');
})

// Update User via profile edit form
router.put('/profile_edit/:id', function (req, res) {
  console.log("Request Body:");
  console.log(req.body);
  var query = {"_id": req.params.id};
  var updatedInfo = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  }

  User.findOneAndUpdate(query, updatedInfo,{ upsert: false },
    function (err, doc) {
      if (err) return res.send(500, { error: err });
        console.log("GOT HERE");
        return res.status(200).json("Successfully saved your answers!");
    })
});

router.post('/login', function (req, res, next) {
  console.log(req.body.email);
  User.findOne({
    "email": req.body.email
  }).then(function (user) {
    if (!user) {
      console.log('User not found');
      console.log(user);
      return res.status(401).json({
        message: "Login Failed"
      });
    } else {
      // console.log("GOT TO LOG IN ROUTE WOOT");
      let passwordMatch = authService.comparePasswords(req.body.password, user.password);
      if (passwordMatch) {
        // console.log("password MATCHED");
        let token = authService.signUser(user);
        res.cookie('jwt', token);
        return res.status(200).json({
          message: "Login Successful",
          token: token
        });
      } else {
        // console.log('Wrong password');
        return res.status(401).json({
          message: "Wrong Credentials."
        });
      }
    }
  });
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

  User.find({ _id: req.params.id }).updateOne({ _id: req.params.id }, updateDoc, function (err, doc) {
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
  User.find({ _id: req.params.id }).deleteOne({ _id: req.params.id }, function (err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete user");
    } else {
      res.status(200).json("Successfully deleted User with id:" + req.params.id);
    }
  });
});

module.exports = router;
