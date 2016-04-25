const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

router.route('/login')
	.get((req, res)=>{
		res.render('auth/login');
	})
	.post(
	);

router.route('/logout')
	.get((req, res)=>{
		
	});

router.route('/google')
  .get(passport.authenticate('google', {scope: 'openid profile email'}))

router.get('/google/callback', (req, res, next) => {
  passport.authenticate('google', (err, user, info) => {
    console.log("AUTHENTICATE HAPPENED")
    if (err) { return next(err); }
    if (!user) { return res.redirect('/'); } // Thinks about adding a flash message to alert user that they don't exist
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      console.log("LOG IN HAPPENED")
      // Knex query to determine if location is 'null'
      knex('users').where('id', user.id).first().then((user) => {
        if(user.location === null) {
          // If null, redirect to user/:id/edit
          return res.redirect('/users/' + user.id + '/edit');
          // CONSIDER ADDING FLASH TO ALERT THAT LOCATION (AND AGE, GENDER) SHOULD BE FILLED IN
        } else {
          // If not null, redirect to user/:id
          return res.redirect('/users/' + user.id);
        }
      }).catch((err) => {
        return res.redirect('/');
      })
    });
  })(req,res,next)
});

module.exports = router;