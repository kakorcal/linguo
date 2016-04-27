const express = require('express');
const app = express();

if (app.get('env') === 'development') {
    require('dotenv').load();
}

const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const morgan = require("morgan");
const routes = require('./routes');
const session = require('cookie-session');
const flash = require('connect-flash');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const authHelpers = require("./helpers/authHelpers");

app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(morgan("dev"))
app.use(express.static(__dirname + '/public'));

//get auth.js module
var auth = require('./routes/auth');

app.use(session({
  secret: process.env.SECRET
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./helpers/passport')(passport);
app.use(authHelpers.currentUser);

app.use('/users', routes.users);
app.use('/auth', routes.auth);
app.use('/threads', routes.threads);
app.use('/languages', routes.languages);
app.use('/threads/:thread_id/messages', routes.messages);


app.get('/', (req,res)=>{
  // Define flash msgs
  var logoutMsg = req.flash('logoutMessage');
  var notLoggedInMsg = req.flash('notLoggedIn');
  // Determine which (if any) flash message has been passed through
  if (!!logoutMsg.length) {
    console.log("A LOGOUT MESSAGE WILL BE DISPLAYED");
    res.render('home', {message: logoutMsg});
  } 
  else if (!!notLoggedInMsg.length) {
    console.log("A NOT LOGGED IN MESSAGE WILL BE DISPLAYED");    
    res.render('home', {message: notLoggedInMsg});
  } 
  else {
    console.log("NORMAL HOME RENDER");
    res.render('home'); 
  }
});


//***************************************************************************
//From Elie's Knex Photos App https://github.com/gSchool/knex_photos_app/blob/part2solution/app.js
//***************************************************************************
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

var port = process.env.PORT || 3000;
app.listen(port, ()=>{
	console.log('Server listening on port '+port+'...');
});

module.exports = app;
