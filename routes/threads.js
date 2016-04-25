const express = require("express"),
	    router = express.Router(),
	    knex = require('../db/knex');
	    //knex

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
		.returning('id')
		.then((thread_id)=>{
			eval(require('locus'))
			knex('messages')
			.insert({
				thread_id: thread_id[0],
				sender_id: 1,
				rec_id: 2,
				message: "default",
			})
			.returning('*')
			.then((data)=>{
				eval(require('locus'))
				knex('thread_participants')
				.insert({thread_id:thread_id[0], user_id:data[0].sender_id})
				.then(()=>{
					eval(require('locus'))
			  	knex('thread_participants')
			  	.insert({thread_id:thread_id[0], user_id:data[0].rec_id})
			  	.then(()=>{})

				})
			
			.then(()=>{
				res.redirect("/threads");
			})
		})
	});
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