var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');

//Route Auth
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

//router.get('/profile', auth, ctrlProfile.profileRead);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({myname: "Your Name"});
});



module.exports = router;
