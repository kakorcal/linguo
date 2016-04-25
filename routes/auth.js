const express = require('express');
const router = express.Router();
const authHelpers = require("../helpers/authHelpers")
const knex = require('../db/knex');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

router.use(authHelpers.currentUser);

// router.route('/login')
// 	.get((req, res)=>{
// 		res.render('auth/login');
// 	})
// 	.post(
// 	);


router.route('/google')
  // LOG IN - STEP 1 > Request is sent to Google to authenticate user
  // Sends request to Google to authenticate user
  // Runs passport.use function in helpers/passport
  .get(passport.authenticate('google', {scope: 'openid profile email'}))

router.get('/google/callback', (req, res, next) => {
  // LOG IN - STEP 4 > User authentication begins (whether they already had account or one was created)
  // Runs passport.serializeUser function in helpers/passport
  passport.authenticate('google', (err, user, info) => {
    console.log("AUTHENTICATE HAPPENED", user);
    if (err) { return next(err); }
    if (!user) { return res.redirect('/'); } // Thinks about adding a flash message to alert user that they don't exist
    // LOG IN - STEP 6 > Process of creating a session is initiated
    // Runs passport.deserializeUser in helpers/passport
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      console.log("LOG IN HAPPENED", user)
      // eval(require('locus'))
      // Knex query to determine if location is 'null'
      knex('users').where('id', user.id).first().then((user) => {
        console.log("USER FOUND")
        if(user.location === null) {
          // If null, redirect to user/:id/edit
          return res.redirect('/users/' + user.id + '/edit');
          // CONSIDER ADDING FLASH TO ALERT THAT LOCATION (AND AGE, GENDER) SHOULD BE FILLED IN
        } else {
          // If not null, redirect to user/:id
          return res.redirect('/users/' + user.id);
        }
      }).catch((err) => {
        console.log("KNEX REQUEST ERRORS OUT")
        return res.redirect('/');
      })
    });
  })(req,res,next)
});

router.route('/logout')
	.get((req, res)=>{
		//req.logout added by passport - delete the user id/session
    req.logout();
    console.log("USER IS LOGGED OUT");
    res.redirect('/');
	});

module.exports = router;