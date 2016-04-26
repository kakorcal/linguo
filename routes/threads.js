const express = require("express"),
	    router = express.Router(),
	    knex = require('../db/knex'),
			authHelpers = require("../helpers/authHelpers");

router.route('/')
	// START A CONVERSATION WITH ANOTHER USER(S)
	.post(function(req, res)
	{
		//INSERTS A THREAD INTO THE THREADS TABLE
		knex('threads')
		.insert(req.body.thread)
		.returning('id')
		.then((thread_id)=>{
			//INSERTS A MESSAGE INTO THE MESSAGES TABLE BASED ON THE THREAD ID
			//CHECK WHAT MESSAGE LOOKS LIKE
			var message = req.body.message;

			knex('messages')
			.insert(
			{
				message: message.message,
				sender_id: message.sender_id,
				rec_id: message.rec_id,
				thread_id: thread_id[0]
			})
			.returning('*')
			.then((data)=>{
				//INSERTS 2 ROWS INTO THE THREAD PARTICIPANTS TABLE BASED ON ID'S RETURNED FROM THE MESSAGE INSERT
				knex('thread_participants')
				.insert({thread_id:thread_id[0], user_id:data[0].sender_id})
				.then(()=>{

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

router.route('/:id')
	// VIEW A SPECIFIC THREAD
	.get(function(req, res)
	{
		knex('threads')
		.where('id', req.params.id)
		.first()
		.then((thread)=>{
			//REFACTOR TO A JOIN BETWEEN MESSAGES AND USERS SO THAT USERS CAN BE DISPLAYED ON THREADS PAGE
			knex('messages')
			.where('thread_id', thread.id)
			.then((messages)=>{
				res.render('threads/show', {thread, messages});
			})
		})
	})

module.exports = router;