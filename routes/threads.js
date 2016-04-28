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

			// eval(require('locus'))
			knex('messages')
			.insert(
			{
				message: message.message,
				sender_id: req.user.id,
				rec_id: message.rec_id,
				thread_id: thread_id[0]
			})
			.returning('*')
			.then((data)=>{
				//INSERTS 2 ROWS INTO THE THREAD PARTICIPANTS TABLE BASED ON ID'S RETURNED FROM THE MESSAGE INSERT
				knex('thread_participants')
				.insert({thread_id:thread_id[0], user_id:data[0].sender_id})
				.then(()=>{
					// eval(require('locus'))
			  	knex('thread_participants')
			  	.insert({thread_id:thread_id[0], user_id:data[0].rec_id})
			  	.then(()=>{})
				})
			.then(()=>{
				//Ideally form closes and flash message about message success
				res.redirect("/users");
			})
		})
	});
});

router.route('/:id')
	// VIEW A SPECIFIC THREAD
	.get(authHelpers.ensureThreadParticipant, function(req, res)
	{
		knex('threads as t')
			.select('t.id as tid', 'm.id as mid', 'm.rec_id as rec_id', 'ur.name as rec_name', 'm.sender_id as send_id', 'us.name as send_name', 't.subject', 'm.message')
			.join('messages as m', 'm.thread_id', 't.id')
			.join('users as ur', 'ur.id', 'm.rec_id')
			.join('users as us', 'us.id', 'm.sender_id')
			.where('t.id', req.params.id)
			.orderBy('m.id')
			.then((threadMsgs) => {
			  res.render('threads/show', {threadMsgs})
			})
	})


module.exports = router;