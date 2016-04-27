const express = require('express');
const router = express.Router();
const authHelpers = require("../helpers/authHelpers")
const knex = require('../db/knex');
const multiline = require('multiline');
const languagesList =  require('../db/languagesList').languages;

router.use(authHelpers.currentUser);

router.route('/')
	.get((req, res)=>{
	res.format({
		html: ()=>{
			knex('users')
				.then(users=>{
				res.render('users/index', {users, languagesList, message: req.flash('notCorrectUser')});
			});
		},
		json: ()=>{
			//NEEDS TO BE REFACTORED TO A JOIN WITH THE LANGUAGES TABLE SO THAT THE WE CAN SEND USERS WHOSE PRACTICING LANGUAGE
			//MATCHES REQ.QUERY.LANGUAGE
			// knex('threads as t')
			// .select('t.id as tid', 'm.id as mid', 'm.rec_id as rec_id', 'ur.email as rec_email', 'm.sender_id as send_id', 'us.email as send_email', 't.subject', 'm.message')
			// .join('messages as m', 'm.thread_id', 't.id')
			// .join('users as ur', 'ur.id', 'm.rec_id')
			// .join('users as us', 'us.id', 'm.sender_id')
			// .where('t.id', req.params.id)
			// .orderBy('m.id')


			knex.select('*')
			.from('users')
			.leftOuterJoin('languages', 'users.id', 'languages.user_id')
			.where('location', req.query.location)
			.andWhere('languages.language', req.query.language)
			.andWhere('languages.approach', 'Teaching')//NOT SURE IF THIS SHOULD BE A RESTRICTION
			.then(users=>{
				eval(require('locus'))
				res.send(users);
			})
		}
	})
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
		// Need to user 'knex.raw' query here because the 'distinct on' join method is not supported in Knex
			// Note 1: 'distinct on' is needed to ensure that ony one record per thread_id is returned

			// Note 2: In a 'knex.raw' query, NEVER NEVER NEVER pass a variable that contains user info (like req.params.id) into the raq 'query' string

					// Why? It leaves you vulnerable to a 'raw SQL injection attack', where someone could 
						// insert their own SQL in that place and change our database

					// Always put a '?' in raw SQL 'query' string, and then pass variables in an array as second argument in 'knex.raw()'
					
		var query = multiline.stripIndent(function() { /*
			select distinct on (m.thread_id) m.id as mid, m.thread_id, m.sender_id, us.name as sender_name, m.rec_id, ur.name as rec_name, t.subject, m.message
			from messages as m
			join threads as t
			on m.thread_id=t.id
			join users as us
			on m.sender_id=us.id
			join users as ur
			on m.rec_id=ur.id
			where m.sender_id=?
			or m.rec_id=?
			order by m.thread_id desc;
		*/});
		knex.raw(query, [req.params.id, req.params.id])
			.then((usersMsgs) => {
				// 'usersMsgs.rows' is needed b/c the 'usersMsgs' returned by the Knex.raq query comes back in a different format than normal Knex
				//  You must access the 'rows' key of the 'usersMsgs' object to get the array of results

				// Set conditionals for messages depening on where/why someone is arriving at their User Show page
				var loginMessage = req.flash('loginMessage');
				var notCorrectUser = req.flash('notCorrectUser');
				if (!!loginMessage.length) {
				  console.log("A USER HAS LOGGED IN MSG WILL BE DISPLAYED");
				  res.render('users/show', {usersMsgs: usersMsgs.rows, message: loginMessage});
				} 
				else if (!!notCorrectUser.length) {
				  console.log("A USER HAS TRIED TO ACCESS A THREAD THEY DON'T BELONG TO");    
				  res.render('users/show', {usersMsgs: usersMsgs.rows, message: notCorrectUser});
				} 
				else {
				  console.log("NORMAL USER SHOW RENDER");
				  res.render('users/show', {usersMsgs: usersMsgs.rows}); 
				}
			})
	})

	.put(authHelpers.ensureCorrectUser, (req, res)=>{
    	knex('users')
				.where('id', req.params.id)
				.update(req.body.user)
				.then(()=>{
					res.send('/users/'+req.params.id+'/edit');	
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
