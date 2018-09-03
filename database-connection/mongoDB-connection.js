require('dotenv').config();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// mLab dbuser
const dbuser = process.env.dbuser;
// mLab dbpassword
const dbpassword = process.env.dbpassword;
// mLab API KEY
const mLabKEY = process.env.mLabKEY;

// MongoDB URI - could be in a config file
let dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/reddit_clone_bew1-1';

mongoose.connect(dbURI, { useNewUrlParser: true });
mongoose.connection.once('open', () => {console.log('Reddit Clone BEW 1-2 MongoDB Connected.')});
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection Error:'));
mongoose.set('debug', true);
