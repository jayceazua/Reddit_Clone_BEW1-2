const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../server');
const Post = require('../models/post')
chai.use(chaiHttp);

describe('Testing posts routes:', () => {
  // Should create with valid attributes at POST /posts
  // Should create a new post
  // How many posts are there now?
  // Make a request to create another
  // Check that the database has one more post in it
  // Check that the response is a successful

});
