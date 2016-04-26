const express = require("express"),
      router = express.Router({mergeParams: true}),
      knex = require('../db/knex'),
      authHelpers = require("../helpers/authHelpers");

router.route('/')
  // REDIRECT TO THREAD SHOW PAGE
  .get((req, res) => {

  })
  // POST A NEW MESSAGE TO EXISTING THREAD
  .post((req, res) => {
    var message = req.body.message;
    var thread_id = +req.params.thread_id;
    eval(require('locus'))
    knex('messages')
      .insert(
        Object.assign(message, {thread_id})
      )
      .then(() => {
        res.redirect('/threads/${thread_id}')
      })
  });


module.exports = router;