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

router.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/'
}));

module.exports = router;