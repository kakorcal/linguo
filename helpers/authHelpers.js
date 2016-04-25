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
  }
};

module.exports = authMiddleware;