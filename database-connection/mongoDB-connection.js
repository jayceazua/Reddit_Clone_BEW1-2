const mongoose = require('mongoose');
// Set a Mongoose Promise library
mongoose.Promise = global.Promise;
// mLab dbuser
const dbuser = process.env.dbuser;
// mLab dbpassword
const dbpassword = process.env.dbpassword;
// MongoDB URI - could be in a config file4
let dbURI = process.env.MONGODB_URI || `mongodb://${dbuser}:${dbpassword}@ds141952.mlab.com:41952/reddit_clone_bew1-2`
// 'mongodb://localhost:27017/reddit_clone_bew1-1';

mongoose.connect(dbURI, { useNewUrlParser: true });
mongoose.connection.once('open', () => {console.log('Reddit Clone BEW 1-2 MongoDB Connected.')});
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection Error:'));
mongoose.set('debug', true);
