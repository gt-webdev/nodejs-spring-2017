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
  res.render('login');
});


app.get('/register', function(req, res) {
  res.render('register');
});


app.post('/register', function(req, res) {
  var users = [];
  var userPath = path.join(CURR_DIR, 'data/user.json');
  // read user.json if exists
  if (fs.existsSync(userPath)) {
    var users = JSON.parse(fs.readFileSync(userPath));
  }

  var newUser = {
    name: req.body.name,
    username: req.body.username,
    password: req.body.password
  };

  users.push(newUser);

  fs.writeFileSync(userPath, JSON.stringify(users));

  req.session.username = newUser.username;
  req.session.name = newUser.name;

  res.redirect('/');
});


app.post('/login', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  var userPath = path.join(CURR_DIR, 'data/user.json');

  var users = [];
  if (fs.existsSync(userPath)) {
    var users = JSON.parse(fs.readFileSync(userPath));
  }

  var user = users.find(function(user) {
    return user.username == username && user.password == password;
  });

  if (!user) {
    res.send('Authentication Failed!');
    return;
  }

  req.session.username = user.username;
  req.session.name = user.name;
  res.redirect('/');
});


app.get('/logout', function(req, res) {
  req.session.destroy();
  res.redirect('/login');
});


app.get('/', function(req, res) {
  if (!req.session.username) {
    res.redirect('/login');
  }

  var articles = [];
  var articlePath = path.join(CURR_DIR, 'data/articles.json');

  if (fs.existsSync(articlePath)) {
    var articles = JSON.parse(fs.readFileSync(articlePath));
  }

  var data = {
    name: req.session.name,
    articles: articles
  }
  res.render('index', data);
});


app.get('/new_article', function(req, res) {
  var username = req.session.username;
  if (!username) {
    res.redirect('/login');
    return;
  }

  res.render('new_article');
})


app.post('/new_article', function(req, res) {
  var articles = [];
  var articlePath = path.join(CURR_DIR, 'data/articles.json');

  if (fs.existsSync(articlePath)) {
    var articles = JSON.parse(fs.readFileSync(articlePath));
  }


  var newArticle = {
    id: articles.length + 1,
    title: req.body.title,
    content: req.body.content,
    author: req.session.name,
    timestamp: Date.now()
  };

  articles.push(newArticle);

  fs.writeFileSync(articlePath, JSON.stringify(articles));

  res.redirect('/');
});


app.get('/article/:id', function(req, res) {
  var id = req.params.id;

  var articles = [];
  var articlePath = path.join(CURR_DIR, 'data/articles.json');

  if (fs.existsSync(articlePath)) {
    var articles = JSON.parse(fs.readFileSync(articlePath));
  }

  var article = articles.find(function(article) {
    return article.id == id;
  });

  if (!article) {
    res.redirect('/');
    return;
  }

  var articleDate = new Date(article.timestamp);

  var data = {
    title: article.title,
    content: article.content,
    author: article.author,
    date: articleDate.getMonth() + '/' + articleDate.getDate() + '/' + articleDate.getFullYear()
  };

  res.render('article', data);
});



app.listen(PORT);

console.log('listening on port ' + PORT + '...');
