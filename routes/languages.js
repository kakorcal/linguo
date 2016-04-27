const express = require("express"),
	    router = express.Router(),
	    knex = require('../db/knex'),
			authHelpers = require("../helpers/authHelpers");

router.route('/')
	.get(function(req, res)
	{})
	.post(function(req, res)
	{
		knex('languages')
		.insert(req.body.language)
		.then(()=>{
			res.redirect('/users/'+req.body.language.user_id+"/edit");
	 })
		.catch(err=>{
			//WRITE TESTS FOR INVALID INPUT
		});
	});

// router.route('/new')
// 	.get(function(req,res)
// 	{});

// router.route('/:id/edit')
// 	.get(function(req, res)
// 	{});

router.route('/:id')
	// .get(function(req, res)
	// {})
	// .put(function(req, res)
	// {})
	.delete(function(req,res)
	{
		knex('languages')
		.where('id', req.params.id)
		.delete()
		.returning('*')
		.then(deleted =>
		{
			res.redirect("/users/"+deleted[0].user_id+"/edit");
		});
	});

module.exports = router;