const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcrypt');

router.route('/')
	.get((req, res)=>{
		res.render('users/index');
	})
	.post((req, res)=>{
		//COMPLETED : ACCEPT A PLAIN TEXT PASSWORD
		bcrypt.hash(req.body.user.password, SALT_WORK_FACTOR, (error, hash)=>{
			eval(require('locus'))
			knex('users')
			.insert({username: req.body.user.username,
							 password: hash})
			.then(()=>{
				res.redirect('/users');
			});
		})
	});

router.route('/new')
	.get((req, res)=>{
		res.render('users/new');
	});

router.route('/:id/edit')
	.get((req, res)=>{
		res.render('users/edit');
	});

router.route('/:id')
	.get((req, res)=>{
		res.render('users/show');
	})
	.put((req, res)=>{
		
	})
	.delete((req, res)=>{
		
	});

module.exports = router;