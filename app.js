require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//var passport = require('passport');
let devDbUser = process.env.DB_USER;
let devDbPass = process.env.DB_PASS;
let devDbHost = process.env.DB_HOST;
// const stage = require('./config')[development];
var cors = require('cors');

//Create global app object
var app = express();

//models
require('./models/user');
require('./models/Question');
require('./models/assessment');
require('./models/response');
// require('./models/answer_option');

// define route variables 
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/api/users');
var questionsRouter = require('./routes/api/questions');
var assessmentsRouter = require('./routes/api/assessments');
var responsesRouter = require('./routes/api/responses');
// var answerOptionRouter = require('./routes/answer_options');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//passport setup
//app.use(passport.initialize());
//app.use('/api', routesApi);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(cors());

//development only

let connection = 'mongodb+srv://'+ devDbUser + ':' + devDbPass + devDbHost
let mongodb = process.env.MONGODB_URI || connection;

//app.user(express.errorHandler());
mongoose.connect(mongodb, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;

let db = mongoose.connection;

//Sends connection error for db into the console.
db.on('error', console.error.bind(console, "'Mongo DB Connection Error'"))


//Set Routeres
app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/questions', questionsRouter);
app.use('/api/assessments', assessmentsRouter);
app.use('/api/responses', responsesRouter);
// app.use('/api/answer_options', answerOptionRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

let port = 5000;
app.listen(`${port}`,() => {
  console.log(`Server is up and running on port number: ${port}`);
})

module.exports = app;
