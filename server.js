require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
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

// CRUD Resource >> INDEX
app.get('/', (req, res) => {
  Post.find().then((posts) => {
    res.render('index.hbs', { posts })
  }).catch((err) => {
    console.log(err.message);
  });
});

const posts = require('./controllers/posts');
// Routes - Middleware
app.use('/posts', posts);


app.listen(port, () => {
  console.log(`Reddit Clone is listening on port: ${port}`);
});
