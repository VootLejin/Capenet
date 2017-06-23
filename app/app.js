var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();


// config db?
var dbConfig = require('./db.js');
//var mongoose = require('mongoose');
//mongoose.connect(dbConfig.url);

// configure Passport
var passport = require('passport');
var expressSession = require('express-session');
var secrets = require('./secrets.js'); // This file intentionally not on Git.
app.use(expressSession(secrets));
app.use(passport.initialize());
app.use(passport.session());


// init flash for storing and displaying messages to frontend
var flash = require('connect-flash');
app.use(flash());

// initPassport
var initPassport = require('./passport/init');
initPassport(passport);


var index = require('./routes/index')(passport);
var userRouter = require('./routes/userRouter')(passport);
var capeRouter = require('./routes/capeRouter')(passport);



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', index);
app.use('/user', userRouter);
app.use('/cape', capeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = app;
