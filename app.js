////////////////////////////////////////////////////////////////////////////////
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var session = require('express-session')
// require('dotenv').load();
var routes = require('./routes/index');
var auth = require('./routes/auth');
var users = require('./routes/users');
var app = express();
var db = require('knex')
var knex = require('./db/knex');
////////////////////////////////////////////////////////////////////////////////
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
////////////////////////////////////////////////////////////////////////////////
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("./client"));
app.use('/', routes);
app.use('/users', users);
app.use('/auth', auth);
app.use(passport.initialize());
app.use(passport.session());
////////////////////////////////////////////////////////////////////////////////
function ensureAuthenticated(req, res, next) {
  console.log("ensureAuthenticated",req.isAuthenticated());
 if (req.isAuthenticated()) {
    return next();
  }
 res.redirect('/');
}
app.get('/auth/google', passport.authenticate('google', {
  scope: 'https://www.googleapis.com/auth/plus.login'
}));
app.get('/auth/google/callback', passport.authenticate('google', {
  failureRedirect: '/login'
}),

function(req, res, next) {
  // Successful authentication, redirect home.
  console.log(req.user.id)
  console.log(req.user.provider);
  console.log(req.user.image);
  res.redirect('/users');
});

app.get('/logout', function(req, res, next){
  req.logout();
  res.redirect('/')
})
////////////////////////////////////////////////////////////////////////////////
app.get('/mainpage', function(req, res, next){
  knex('users').select().then(function(data){
    console.log('sending back data');
    res.status(200).json({data: data})
  })
})



////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});


module.exports = app;
