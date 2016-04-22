const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.route('/')
	.get((req, res)=>{
		res.render('users/index');
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