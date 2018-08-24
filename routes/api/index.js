var express = require('express');
var router = express.Router();

var events = require('./events');
router.use('/events', events);

module.exports = router;
