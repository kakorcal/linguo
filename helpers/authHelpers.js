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
  }
};

module.exports = authMiddleware;