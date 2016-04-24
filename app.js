require('dotenv').load();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const morgan = require("morgan");
const routes = require('./routes');
const session = require('cookie-session');
const flash = require('connect-flash');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(morgan("dev"))
app.use(express.static(__dirname + '/public'));

//get auth.js module
var auth = require('./routes/auth');


app.use(session({
  secret: process.env.SECRET
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//***************************************************************************
//GOOGLE oAuth -- Should think about moving to a separate JS file later to abstract code
//***************************************************************************
passport.serializeUser(function(user, done) {
  //later this will be where you selectively send to the browser an identifier for your user, like their primary key from the database, or their ID from linkedin
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  //here is where you will go to the database and get the user each time from it's id, after you set up your db
  done(null, obj);
});


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_API_KEY,
    clientSecret: process.env.GOOGLE_SECRET_KEY,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // const user = profile._json;
    eval(require('locus'))
    // console.log(profile)
    // console.log("EMAILSSSSSSS",profile.emails);
    return done(null, profile);
  }
));



app.get('/', (req,res)=>{
	res.render('home');
});

app.use('/users', routes.users);
app.use('/auth', routes.auth);
app.use('/threads', routes.threads);


app.listen(3000, ()=>{
	console.log('Server listening on port 3000...');
});
