const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const passport = require('passport');
const LocalStrategy = require('passport-facebook').Strategy
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy({
	usernameField: 'user[username]',
	passwordField: 'user[password]',
	passReqToCallback: true
}, (req, username, password, done)=>{
	knex('users')
	.where('username', username)
	.first()
	.then((user)=>{
		eval(require('locus'))
		if(!user)
		{
			//NO USER WITH THAT USERNAME
		}
		bcrypt.compare(password, user.password, (error, isMatch) =>{
			eval(require('locus'))
			if(!isMatch){
				//PASSWORDS DON'T MATCH
				return done(null, false, {message: "Your Password is Incorrect!"});
			}
			else
			{
				return done(null, user, {message: "Welcome Back!"})
			}
		});
	});
}));

passport.serializeUser((user, done) =>{
	done(null, user.id);
});



router.route('/login')
	.get((req, res)=>{
		res.render('auth/login');
	})
	.post(
		passport.authenticate('local',
		{
			successRedirect: '/users',
			failureRedirect: '/auth/login',
			failureFlash: true,
			successFlash: true
		}
	));

router.route('/logout')
	.get((req, res)=>{
		
	});

module.exports = router;