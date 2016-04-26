const express = require("express"),
      router = express.Router(),
      knex = require('../db/knex'),
      authHelpers = require("../helpers/authHelpers");

router.route('/')
  // REDIRECT TO THREAD SHOW PAGE
  .get((req, res) => {

  })
  // POST A NEW MESSAGE TO EXISTING THREAD
  .post((req, res) => {
    
  });


module.exports = router;