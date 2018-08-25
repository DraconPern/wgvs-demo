var mongoose = require('mongoose');
const uuid = require('uuid/v4');

mongoose.connect(process.env.MONGODB_URL);

const Event = mongoose.model('Event', {eventId: String, name: String, description: String });

exports.getEvents = function (callback) {
  Event.find().exec()
  .then(function(events) {
    return callback(null, events);
  })
  .catch(function(err) {
    return next(err);
  })
}

exports.getEvent = function (eventId, callback) {
  Event.findOne({eventId}).exec()
  .then(function(event) {
    return callback(null, event);
  })
  .catch(function(err) {
    return next(err);
  })
}

exports.addEvent = function (data, callback) {
  data.eventId = uuid();
  Event.create(data)
  .then(function(event) {
    return callback(null, event);
  })
  .catch(function(err) {
    return next(err);
  })
}

exports.updateEvent = function (data, callback) {  
  Event.updateOne({eventId: data.eventId}, data)
  .then(function(event) {
    return callback(null, event);
  })
  .catch(function(err) {
    return next(err);
  })
}

exports.deleteEvent = function (eventId, callback) {
  Event.deleteOne({eventId})
  .then(function() {
    return callback(null, true);
  })
  .catch(function(err) {
    return next(err);
  })
}
