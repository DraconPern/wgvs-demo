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
})

router.post('/', function(req, res, next) {
})

router.post('/:eventId', function(req, res, next) {
})

module.exports = router;
