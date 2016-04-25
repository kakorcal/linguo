const express = require('express');
const router = express.Router();
const authHelpers = require("../helpers/authHelpers")
const knex = require('../db/knex');

router.use(authHelpers.currentUser);

router.route('/')
	.get((req, res)=>{
		knex('users')
		.then(users=>{
			res.render('users/index', {users, user: req.user});
		});
	})
	.post((req, res)=>{
		res.redirect('/users');
	});

router.route('/new')
	.get((req, res)=>{
		res.render('users/new');
	});

router.route('/:id/edit')
	.get((req, res)=>{
		knex('users')
		.where('id', req.params.id)
		.first()
		.then(user=>{
			knex('languages')
			.where('user_id', user.id)
			.then(languages => {
				res.render('users/edit', {user, languages, message: req.flash('loginMessage')});
			});
		});
	})

router.route('/:id')
	.get((req, res)=>{
		knex('users')
		.where('id', req.params.id)
		.first()
		.then(user=>{
			knex('languages')
			.where('user_id', user.id)
			.then(languages => {
				res.render('users/show', {user, languages, message: req.flash('loginMessage')});
			});
		});
	})
	.put((req, res)=>{
			knex('users')
			.where('id', req.params.id)
			.update(req.body.user)
			.then(()=>{
				res.redirect('/users/'+req.params.id);	
			});
	})
	.delete((req, res)=>{
		knex('users')
		.where('id', req.params.id)
		.del()
		.then(()=>{
			res.redirect('/');
		});
	});

module.exports = router;
