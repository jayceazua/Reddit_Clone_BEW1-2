const express = require('express');
const router = express.Router();
const Post = require('../models/posts.js');


// Index route show all posts
router.get('/', (req, res) => {
	Post.find({}, (err, posts) => {
		res.render('index', { posts: posts });
	});
});

// Renders the new post form
router.get('/posts/new', (req, res)=> {
	res.render('posts/new');
});

// Create post
router.post('/posts/new', (req, res) => {

	let post = new Post(req.body);
  post.save((err, post) => {
		return res.redirect('/');
	})
});

// SHOW post by posts/:id
router.get('/posts/:id', (req, res) => {
	// LOOK UP THE POST
	Post.findById(req.params.id).populate('comments')
		.then( post => { res.render('posts/show', { post: post }) })
		.catch((err) => { console.log(err.message) })
});

// SUBREDDIT
router.get('/s/:subreddit', (req, res) => {
	console.log(req.params.subreddit)
	Post.find({ subreddit: req.params.subreddit })
		.then( posts => { res.render('index', { posts }) })
		.catch( err => { console.log(err.message) })
});


module.exports = router;
