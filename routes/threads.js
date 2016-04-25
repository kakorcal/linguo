const express = require("express"),
	    router = express.Router(),
	    knex = require('../db/knex'),
			authHelpers = require("../helpers/authHelpers");

router.route('/')
	.get(function(req, res)
	{
		knex('threads')
		.then((threads)=>{
			res.render("threads/index", {threads})
		})
	})
	.post(function(req, res)
	{
		knex('threads')
		.insert(req.body.thread)
		.then(()=>{
			res.redirect("/threads")	
		})
	});

router.route('/new')
	.get(function(req,res)
	{
		res.render("threads/new");
	});

router.route('/:id/edit')
	.get(function(req, res)
	{});

router.route('/:id')
	.get(function(req, res)
	{
		knex('threads')
		.where('id', req.params.id)
		.first()
		.then((thread)=>{
			res.render('threads/show', {thread});
		})
	})
	.put(function(req, res)
	{
	})
	.delete(function(req,res)
	{
		knex('threads')
		.where('id', req.params.id)
		.delete()
		.then(()=>{
			res.redirect('/threads')
		});
	});

module.exports = router;