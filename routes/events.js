var express = require('express');
var router = express.Router();

var request = require('request-promise-native');

router.get('/', function(req, res) {
  request(process.env.API_URL + '/api/events', { json: true})
  .then(function(agentbody) {
    return res.render('events/index', agentbody);
  })
  .catch(function(err) {
    req.flash('error', err);
    return res.render('events/index');
  })
});

router.get('/new', function(req, res) {
  return res.render('events/new');
});

router.post('/new', function(req, res, next) {
  request.post(process.env.API_URL + '/api/events', { body: req.body, json: true})
  .then(function(agentbody) {
    req.flash('success', 'events created.');
    return res.redirect('/events');
  })
  .catch(function(err) {
    req.flash('error', err);
    return res.render('events/new', req.body);
  })
})

router.get('/:eventId', function(req, res, next) {
  request(process.env.API_URL + '/api/events/' + req.params.eventId, {json: true})
  .then(function(agentbody) {
    return res.render('events/update', agentbody.event);
  })
  .catch(function(err) {
    req.flash('error', err);
    return res.render('events/update', req.body);
  })
})

router.post('/:eventId', function(req, res, next) {
  if(req.body.submit == 'Update') {
    updateEvent(req, res);
  } else if(req.body.submit == 'Delete') {
    deleteEvent(req, res);
  } else {
    return res.redirect('/events');
  }
})

function updateEvent(req, res)
{
  request.post(process.env.API_URL + '/api/events/' + req.params.eventId, { body: req.body, json: true})
  .then(function(agentbody) {
    req.flash('success', 'Event updated.');
    return res.redirect('/events');
  })
  .catch(function(err) {
    req.flash('error', err);
    return res.render('events/update', req.body);
  });
}

function deleteEvent(req, res)
{
  request.delete(process.env.API_URL + '/api/events/' + req.params.eventId, { json: true})
  .then(function(agentbody) {
    req.flash('success', 'Event deleted.');
    return res.redirect('/events');
  })
  .catch(function(err) {
    req.flash('error', err);
    return res.render('events/update', req.body);
  });
}
module.exports = router;
