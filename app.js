require('dotenv').load();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const routes = require('./routes');
const session = require('cookie-session');
const flash = require('connect-flash');
const passport = require('passport');


app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));

app.use(passport.initialize());


app.use(session({
	secret: process.env.SECRET
}));

app.use(flash());

app.get('/', (req,res)=>{
	res.redirect('/auth/login');
});

app.use('/users', routes.users);
app.use('/auth', routes.auth);
app.use('/threads', routes.threads);


app.listen(3000, ()=>{
	console.log('Server listening on port 3000...');
});
