/* import dependencies */
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')
var session = require('express-session');
var cookieParser = require('cookie-parser');
var fs = require('fs');

/* creates a new express application */
var app = express();

/* assign constants */
var PORT = 8080;
var CURR_DIR = __dirname;

/* set express middleware */
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({ secret: 'put anything here just because we have to' }));
/* NOTE:
 * bodyParser is used for parsing the parameters in our POST request
 * cookieParser and session are both used for session management (login function)
 * /

/* Set configs for ejs templating engine */
app.set('views', path.join(CURR_DIR, 'public'))
app.set('view engine', 'ejs')


/* ROUTING */

app.get('/login', function(req, res) {
  /* TODO:
   * 1. Render login.ejs page
   *
   */

});


app.get('/register', function(req, res) {
  /* TODO:
   * 1. Render register.ejs
   *
   */

});


app.post('/register', function(req, res) {
  /* TODO:
   * 1. Add user to the list of users in user JSON file.
   *    If the user JSON file doesn't exist, create a new one.
   * 2. Write to file
   * 3. Set user session
   * 4. Redirect user to home
   *
   */

});


app.post('/login', function(req, res) {
  /* TODO:
   * 1. Fetch all users from user JSON file
   * 2. Check if the login credentials match any user
   * 3. If no user found, then send back 'Authentication Failed'
   * 4. If there is a match, then set the user session and redirect user to home page
   *
   */

});


app.get('/logout', function(req, res) {
  /* TODO:
   * 1. Destroy session
   * 2. Redirect to login.ejs page
   *
   */

});


app.get('/', function(req, res) {
  /* TODO:
   * 1. Check if user is logged in, if not redirect them to login page
   * 2. Fetch articles stored in articles JSON file. If JSON file for articles doesn't exist,
   *    assume no article exists
   * 3. Render index.ejs and pass the following:
   *    - Name of logged in user
   *    - Array of article objects
   *
   */

});


app.get('/new_article', function(req, res) {
  /* TODO:
   * 1. Check if user is logged in, redirect them to login page if not
   * 2. Render new_article.ejs page
   *
   */

});


app.post('/new_article', function(req, res) {
  /* TODO:
   * 1. Fetch all articles from articles JSON file.
   * 2. Append the new article to the list of articles.
   * 3. Write to file
   * 4. Redirect user to home
   *
   */

});


app.get('/article/:id', function(req, res) {
  /* TODO:
   * 1. Fetch the list of articles from articles JSON file
   * 2. Get the article with the specified ID
   * 3. If such article does not exist, redirect user to home
   * 4. Render article.ejs, passing the following:
   *    - article title
   *    - article content
   *    - article author
   *    - article date (in string format)
   *
   */

});





app.listen(PORT);

console.log('listening on port ' + PORT + '...');
