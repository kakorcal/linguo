require('dotenv').load();

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const knex = require('../db/knex');

module.exports = (passport) => {
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_API_KEY,
      clientSecret: process.env.GOOGLE_SECRET_KEY,
      callbackURL: "http://localhost:3000/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      // const user = profile._json;
      // console.log(profile)
      // console.log("EMAILSSSSSSS",profile.emails);
      return done(null, profile);
    }
  ));

  passport.serializeUser(function(user, done) {
    //later this will be where you selectively send to the browser an identifier for your user, like their primary key from the database, or their ID from linkedin
    done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
    //here is where you will go to the database and get the user each time from it's id, after you set up your db
    done(null, obj);
  });
}