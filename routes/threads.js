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
		knex('threads as t')
			.select('t.id as tid', 'm.id as mid', 'm.rec_id as rec_id', 'ur.email as rec_email', 'm.sender_id as send_id', 'us.email as send_email', 't.subject', 'm.message')
			.join('messages as m', 'm.thread_id', 't.id')
			.join('users as ur', 'ur.id', 'm.rec_id')
			.join('users as us', 'us.id', 'm.sender_id')
			.where('t.id', req.params.id)
			.orderBy('m.id')
			.then((threadMsgs) => {
			  res.render('threads/show', {threadMsgs})
			})
	})

	// language_app=# select t.id as tid, m.id as mid, m.rec_id as rec_id, ur.email as rec_email, m.sender_id as send_id, us.email as send_email, t.subject, m.message from threads as t
	// join messages as m
	// on m.thread_id=t.id
	// join users as ur
	// on ur.id=m.rec_id
	// language_app-# join users as us
	// language_app-# on us.id=m.sender_id
	// language_app-# where t.id=8;

module.exports = router;