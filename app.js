require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let devDbUser = process.env.DB_USER;
let devDbPass = process.env.DB_PASS;
let devDbHost = process.env.DB_HOST;
const stage = require('./config')[environment];
var cors = require('cors');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

//development only

let connection = 'mongodb+srv://'+ devDbUser + ':' + devDbPass + devDbHost
let mongodb = process.env.MONGODB_URI || connection;

//app.user(express.errorHandler());
mongoose.connect(mongodb, {useNewUrlParser: true});
mongoose.Promise = global.Promise;

let db = mongoose.connection;

//Sends connection error for db into the console.
db.on('error', console.error.bind(console, "'Mongo DB Connection Error'"))


//Set Routeres
app.use('/', indexRouter);
app.use('/users', usersRouter);

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
app.listen(`${stage.port}`,() => {
  console.log(`Server is up and running on port number: ${stage.port}`);
})

module.exports = app;
