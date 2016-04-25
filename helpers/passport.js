require('dotenv').load();

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const knex = require('../db/knex');

module.exports = (passport) => {
  // LOG IN - STEP 2 > Determine if User exists
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_API_KEY,
      clientSecret: process.env.GOOGLE_SECRET_KEY,
      callbackURL: "http://localhost:3000/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      const data = profile._json;
      // LOG IN - STEP 3 > Does user have an account with us?
      knex('users').where('email', data.emails[0].value).first().then((user) => {
        
        // If not, insert them into the database
        if(!user) {
          knex('users').insert({
            email: data.emails[0].value,
            google_id: data.id,
            name: data.displayName,
            img_url: data.image.url
          })
          .returning('*')
          .then((user) => {
            console.log('USER CREATED', user);
            return done(null, user[0]);
          })
        }
        // If yes, pass along their information
        else {
          console.log('USER ALREADY EXISTS', user);
          return done(null, user);
        }
      }).catch((err) => {
        return done(err, null);
      })
    }
  ));

  passport.serializeUser(function(user, done) {
    // LOG IN - STEP 5 > User's 'hand is stamped'
    // Goes to req.logIn in auth.js
    //later this will be where you selectively send to the browser an identifier for your user, like their primary key from the database, or their ID from linkedin
    console.log("SERIALIZE" ,user)
    var id = user.id;
    done(null, user.id);
  });

  passport.deserializeUser(function(obj, done) {
    // LOG IN - STEP 7 > User's 'hand stamp' is checked, and their ID can be passed to find the user and attach it to req.user
    //here is where you will go to the database and get the user each time from it's id, after you set up your db
    knex('users').where('id', obj).first()
      .then((user) => {
        console.log("DESERIALIZE", user)
        done(null, user);
      }).catch((err) => {
        console.log("DESERIALIZE FAILED", err)
        done(err, null);
      });
  });
}