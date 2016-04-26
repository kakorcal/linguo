const knex = require('../db/knex');

const authMiddleware = {
  currentUser(req, res, next) {
    // if user is authenticated (passport method returns true when serialized)
    if (req.isAuthenticated()) {
      // set "currentUser"
      // this is available in the view for all requests, deserializing FTW
      res.locals.currentUser = req.user;
      console.log("CURRENT USER IS SET");
      // eval(require('locus'))
      return next();
    }
    else {
      console.log("CURRENT USER NOT SET");
      return next();
    }
  },
  ensureCorrectUser(req, res, next) {
    // Is User logged in?
    if (req.isAuthenticated()) {
      // Is this user trying to access a different user's page?
      if (+req.params.id !== req.user.id) {
        req.flash('notCorrectUser', 'You may not access/edit another user\'s account');
        console.log("NOT CORRECT USER MSG WILL BE DISPLAYED");
        res.redirect('/users');
      }
      // Confirmed: User is accessing own page
      else {
        return next();
      }
    }
    else {
      req.flash('notLoggedIn', 'Please log in to access all site features');
      res.redirect('/');
    }
  },
  ensureThreadParticipant(req, res, next) {
    // Is User logged in?
    if (req.isAuthenticated()) {
      // Find users in thread
      knex('thread_participants')
        .select('user_id as uid')
        .where('thread_id', req.params.id)
        .then((users) => {
          // Is this user either the sender or recipient in this thread
          users.forEach((el) => {
            if (el.uid === req.user.id) { return next() } 
          })
          req.flash('notCorrectUser', 'You may not access message threads in which you are not a participant');
          res.redirect(`/users/${req.user.id}`);
        })
    }
    else {
      req.flash('notLoggedIn', 'Please log in to access all site features');
      res.redirect('/');
    }
  }
};

module.exports = authMiddleware;