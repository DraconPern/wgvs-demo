var session = require('express-session');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);

// create an express-session object that uses mongodb as the backend
mongoose.connect(process.env.MONGODB_URL);

var sessionStore = new MongoStore({ mongooseConnection: mongoose.connection });
module.exports.sessionStore = sessionStore;
module.exports.session = session({
    name: 'wgvs-eric',
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    cookie: {
      maxAge: 4 * 60 * 60 * 1000,
      // domain: process.env.LOCAL_DEVELOPMENT ? '' : 'somedomain.com'
    },
    rolling: true,
    resave: false,
    saveUninitialized: false
  });
