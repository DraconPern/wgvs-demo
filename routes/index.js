var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

if(process.env.NO_API != 'true') {

  router.use(bodyParser.json());

  var api = require('./api');
  router.use('/api', api);
}

if(process.env.NO_WEBSITE != 'true') {

  // parse formdata from this point forward
  router.use(bodyParser.urlencoded({ extended: true }));

  router.get('/', function(req, res, next) {
    res.render('index');
  });

  var events = require('./events');
  router.use('/events', events);

}

module.exports = router;
