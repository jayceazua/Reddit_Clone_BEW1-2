require('dotenv').config();
const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const path = require('path');
const postController = require('./controllers/posts.js');
const commentsController = require('./controllers/comments.js');
const authController = require('./controllers/auth');

// Port
const port = process.env.PORT || 3000;


// MIDDLEWARE
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// express-handlebars
app.engine('hbs', hbs({defaultLayout: 'main', extname: 'hbs'}));
app.set('view engine', 'hbs');


// static content
app.use(express.static('./public'));



// ROUTES
app.use('', postController);
app.use('',  commentsController);
app.use('', authController);



// Database Connection
require('./database-collection/mongoDB-connection')

// Server
app.listen(port, () => {
	console.log(`Reddit Server listening on ${port}`);
});
