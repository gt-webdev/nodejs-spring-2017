/* This is how you import */
var express = require('express');
var path = require('path');

/* creates a new express application */
var app = express();

/* Setting constants */
var PORT = 8080;
var CURR_DIR = __dirname;

/* Set configs for ejs templating engine */
app.set('views', path.join(CURR_DIR, 'public')); // views = curr_dir/public
app.set('view engine', 'ejs');



/* ======== ROUTING ======== */

/* GET / */
app.get('/', function(req, res) {
  res.send('Welcome to FNN, your reliable news outlet.');
});


/* GET /about */
app.get('/about', function(req, res) {
  res.send('<html><body><h1>This is an about page</h1></body><html>');
});


/* GET /article/:id */
app.get('/article/:id', function(req, res) {
  var id = req.params.id;
  //res.send('This is article number: ' + id);

  var data = {
    title: 'Article Number: ' + id,
    content: 'This is the content of article number: ' + id
  };

  res.render('index', data);
});


/* POST /login */
app.post('/login', function(req, res) {
  // TODO
});


/* tells your express application to listen on a specific port */
app.listen(PORT);

console.log('listening on port ' + PORT + '...');

