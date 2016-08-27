require('rootpath')();
var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('config.json');
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect('mongodb://localhost:27017/localhost', function(err, dbconn) {
  if(err) {
    console.log("We are not  connected");

    db = dbconn;
  }
  if(!err){
  	console.log("we are connected");
  	db = dbconn;
  }
});

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: config.secret, resave: false, saveUninitialized: true }));

// use JWT auth to secure the api
app.use('/api', expressJwt({ secret: config.secret }).unless({ path: ['/api/users/authenticate', '/api/users/register'] }));

// routes
app.use('/login', require('./controllers/login.controller'));
app.use('/register', require('./controllers/register.controller'));
app.use('/app', require('./controllers/app.controller'));
app.use('/api/users', require('./controllers/api/users.controller'));

// make '/app' default route
app.get('/', function (req, res) {
    return res.redirect('/app');
});
app.get('/admin', function (req, res) {

 
    return res.redirect('admin');
});

app.post
('/users', function(req,res){
	console.log(req.body);
	res.send();
});

// start server
var server = app.listen(3000, function () {
    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});