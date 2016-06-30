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
						knex('languages').where('approach', 'Teaching').then(teachers => {
							knex('languages').where('approach', 'Learning').then(learners => {
								res.render('users/index', 
									{users, languagesList, teachers, learners, message: req.flash('notCorrectUser')}
								);
							});
						});
				});
			},
			json: ()=>{
				if(!req.query.location)
				{
					req.query.location = req.user.location;
					knex.select('language')
					.from('languages')
					.where('user_id', req.user.id)
					.then((languages)=>{
						req.query.languages = [];
						languages.forEach((el)=>{
							req.query.languages.push(el.language);
						})
						res.send(req.query);
					})
				}
				else
				{

					knex('languages').then(languages => {
						knex.select('*')
						.from('users')
						.leftOuterJoin('languages', 'users.id', 'languages.user_id')
						.whereIn('languages.language', req.query.language)
						.andWhere('location', req.query.location)
						.then(users=>{
								for(var i = 0; i < users.length; i++) {
	                // Create empty arrays for the languages, proficiency and approach keys
	                users[i].language = [];
	                users[i].proficiency = [];
	                users[i].approach = [];
	                // Loop through languages, finding any entry that contains user_id
	                for(var j = 0; j < languages.length; j++) {
	                  // If the id of the matched user is found in the languages table
	                  if (languages[j].user_id === users[i].user_id) {
	                    // Create empty arrays for the 
	                    users[i].proficiency.push(languages[j].proficiency);
	                    users[i].approach.push(languages[j].approach);
	                    users[i].language.push(languages[j].language);
	                  }
	                }
	              }

								users.forEach(cur => {
									cur.teaching = [];
									cur.learning = [];
								});
	
								for(var i = 0; i < users.length; i++){
									users[i].approach.forEach((app, idx) => {
										if(app === 'Teaching'){
											users[i].teaching.push({lang: users[i].language[idx], prof: users[i].proficiency[idx]});
										}
										if(app === 'Learning'){
											users[i].learning.push({lang: users[i].language[idx], prof: users[i].proficiency[idx]});
										}
									});						
								}
								
								res.send(users);
						});
					});
				}
			}
		});
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
				res.render('users/edit', {user, languages, languagesList, message: req.flash('loginMessage')});
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
					eval(require('locus'));
					// 'usersMsgs.rows' is needed b/c the 'usersMsgs' returned by the Knex.raw query comes back in a different format than normal Knex
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
				.returning('*')
				.then((user)=>{
					//res.send('/users/'+req.params.id+'/edit');
					res.send(user[0]);
				});
  	})
	.delete(authHelpers.ensureCorrectUser, (req, res)=>{
		req.logout();
		console.log("LOGOUT SUCCESSFUL");
		knex('users')
		.where('id', req.params.id)
		.del()
		.then(()=>{
			console.log("USER DELETED");
			req.flash('accountDeleted', 'Your account has been successfully deleted');
			res.redirect('/');
		});
	});

module.exports = router;
