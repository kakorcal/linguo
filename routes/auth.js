const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;


router.route('/login')
	.get((req, res)=>{
		res.render('auth/login');
	})
	.post(
	  res.redirect();
	));

router.route('/logout')
	.get((req, res)=>{
		
	});

module.exports = router;