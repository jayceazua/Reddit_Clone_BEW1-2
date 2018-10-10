require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const methodOverride = require('method-override');
const app = express();
const port = process.env.PORT || 3000;

// Database Connection
require('./database-connection/mongoDB-connection');
const Post = require('./models/post');
// Template Engine setup
app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: __dirname + '/views/layouts/'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// override with POST having ?_method=DELETE & ?_method=PUT
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('_method'));
app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    let method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

// CRUD Resource >> INDEX
app.get('/', (req, res) => {
  Post.find().then((posts) => {
    res.render('index.hbs', { posts })
  }).catch((err) => {
    console.log(err.message);
  });
});

const posts = require('./controllers/posts');
const categories = require('./controllers/categories');
const users = require('./controllers/auth');
// Routes - Middleware
app.use('/posts', posts);
app.use('/c', categories);
app.use('', users);


module.exports = app.listen(port);
