var express = require('express');
var router = express.Router();
var events = require('../../dal/events');
var Promise = require("bluebird");
Promise.promisifyAll(events);

router.get('/', function(req, res, next) {
  events.getEventsAsync()
  .then(function(events) {
    return res.json({events});
  })
  .catch(function(err) {
    return next(err);
  })
})

router.get('/:eventId', function(req, res, next) {
  events.getEventAsync(req.params.eventId)
  .then(function(event) {
    return res.json({event});
  })
  .catch(function(err) {
    return next(err);
  })
})

router.post('/', function(req, res, next) {
  events.addEventAsync(req.body)
  .then(function(event) {
    return res.json({event});
  })
  .catch(function(err) {
    return next(err);
  })
})

router.post('/:eventId', function(req, res, next) {
  req.body.eventId = req.params.eventId;
  events.updateEventAsync(req.body)
  .then(function(event) {
    return res.json(event);
  })
  .catch(function(err) {
    return next(err);
  })
})

router.delete('/:eventId', function(req, res, next) {
  events.deleteEventAsync(req.params.eventId)
  .then(function(result) {
    return res.json(result);
  })
  .catch(function(err) {
    return next(err);
  })
})

module.exports = router;
