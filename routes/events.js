var express = require('express');
var router = express.Router();

var request = require('request-promise-native');

router.get('/', function(req, res) {
  request(process.env.API_URL + '/api/events', { json: true})
  .then(function(agentbody) {
    return res.render('events/index', agentbody);
  })
  .catch(function(err) {
    return res.render('events/index');
  })
});

router.get('/new', function(req, res) {
  return res.render('events/new');
});

router.post('/new', function(req, res, next) {

})

router.get('/:eventId', function(req, res, next) {
    return res.render('events/update');
})

router.post('/:eventId', function(req, res, next) {
  if(req.body.submit == 'Update') {

  } else if(req.body.submit == 'Delete') {

  } else {
    return res.redirect('/events');
  }
})

module.exports = router;
