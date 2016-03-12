var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var session = require('express-session')


// require('dotenv').load();

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("./client"));

app.use('/', routes);
app.use('/users', users);


passport.use(new GoogleStrategy({
    clientID: '773900865133-sjfq4unc2f2c0jvvbrrseb3j2r0d0eks.apps.googleusercontent.com',
    clientSecret: '5nk_rXLaJKhiq1Xu6YiMvbjf',
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
      return done(null, profile);
    });
  }
));

passport.serializeUser(function(user,done){
  done(null, user)
})

passport.deserializeUser(function(obj,done){
  done(null, obj)
})

app.use(session({
  secret: 'keyboardcat',
  resave: true,
  saveUninitialized: true,
}))

// user authenication
app.use(passport.initialize());
app.use(passport.session());

// run authentication
function ensureAuthenticated(req, res, next) {
 console.log("ensureAuthenticated",req.isAuthenticated());
 if (req.isAuthenticated()) { return next(); }
 res.redirect('/');
}

// google oauth

app.get('/auth/google',
  passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/plus.login' }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/users');
  });

app.get('/logout', function(req, res, next){
  req.logout();
  res.redirect('/')
})


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
