const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;

router.route('/login')
	.get((req, res)=>{
		res.render('auth/login');
	})
	.post(
	);

router.route('/logout')
	.get((req, res)=>{
		
	});

module.exports = router;