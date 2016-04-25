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
      const data = profile._json;
      // Does user have an account with us?
      knex('users').where('email', data.emails[0].value).first().then((user) => {
        // If not, insert them into the database
        if(!user) {
          knex('users').insert({
            email: data.emails[0].value,
            google_id: data.id,
            name: data.displayName,
            img_url: data.image.url
          }).then((user) => {
            console.log('USER CREATED', user);
            return done(null, user);
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
    //later this will be where you selectively send to the browser an identifier for your user, like their primary key from the database, or their ID from linkedin
    console.log("SERIALIZE")
    done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
    //here is where you will go to the database and get the user each time from it's id, after you set up your db
    console.log("DESERIALIZE")
    done(null, obj);
  });
}