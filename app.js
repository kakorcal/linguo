require('dotenv').load();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const routes = require('./routes');
const session = require('cookie-session');
const flash = require('connect-flash');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;


app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));
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
passport.use(new GoogleStrategy({
    consumerKey: process.env.GOOGLE_API_KEY,
    consumerSecret: process.env.GOOGLE_SECRET_KEY,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
       User.findOrCreate({ googleId: profile.id }, function (err, user) {
         return done(err, user);
       });
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
