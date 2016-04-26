const express = require('express');
const router = express.Router();
const authHelpers = require("../helpers/authHelpers")
const knex = require('../db/knex');

router.use(authHelpers.currentUser);

router.route('/')
	.get((req, res)=>{
		knex('users')
		.then(users=>{
			res.render('users/index', {users, message: req.flash('notCorrectUser')});
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
	.get(authHelpers.ensureCorrectUser, (req, res)=>{
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
	.get(authHelpers.ensureCorrectUser, (req, res)=>{
		knex('messages as m')
			.select('u.id as uid', 'm.id as mid', 'm.thread_id', 'm.sender_id', 'u.email as send_email', 'm.rec_id', 't.subject')
			.join('threads as t', 'm.thread_id', 't.id')
			.join('users as u', 'm.sender_id', 'u.id')
			.where('m.sender_id', req.params.id)
			.orWhere('m.rec_id', req.params.id)
			.then((usersMsgs) => {
				res.render('users/show', {usersMsgs, message: req.flash('loginMessage')});
			})
	})

	// language_app=# select us.id as uid,  m.id as mid, m.thread_id, m.sender_id, us.email as send_email, m.rec_id, ur.email as rec_email,  t.subject     
	// from messages as m
	// join threads as t
	// on m.thread_id=t.id
	// join users as us
	// on m.sender_id=us.id
	// join users as ur
	// on m.rec_id=ur.id
	// where m.sender_id=5 or m.rec_id=5;

	.put(authHelpers.ensureCorrectUser, (req, res)=>{
			knex('users')
			.where('id', req.params.id)
			.update(req.body.user)
			.then(()=>{
				res.redirect('/users/'+req.params.id);	
			});
	})
	.delete(authHelpers.ensureCorrectUser, (req, res)=>{
		knex('users')
		.where('id', req.params.id)
		.del()
		.then(()=>{
			res.redirect('/');
		});
	});

module.exports = router;
