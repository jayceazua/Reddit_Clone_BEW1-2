const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../server');
const Post = require('../models/post')
chai.use(chaiHttp);

describe('Testing posts routes:', () => {

  it('Should create with valid attributes at POST /posts', (done) => {
    chai.request('http://localhost:3000')
    .get('/')
    .then((res) => {
      res.status.should.equal(200);
      return done();
    }).catch((err) => {
      return done(err);
    });
  });

  it('Should create a new post', (done) => {
    // How many posts are there now?
    // Make a request to create another
    // Check that the database has one more post in it
    // Check that the response is a successful
  });

});
