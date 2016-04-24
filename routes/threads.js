const express = require("express"),
	    router = express.Router(),
	    knex = require('../db/knex');
	    //knex

router.route('/')
	.get(function(req, res)
	{ 
	})
	.post(function(req, res)
	{});

router.route('/new')
	.get(function(req,res)
	{});

router.route('/:id/edit')
	.get(function(req, res)
	{});

router.route('/:id')
	.get(function(req, res)
	{})
	.put(function(req, res)
	{})
	.delete(function(req,res)
	{});

module.exports = router;