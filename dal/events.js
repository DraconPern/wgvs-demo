var mongoose = require('mongoose');
const uuid = require('uuid/v4');
var createError = require('http-errors');

mongoose.connect(process.env.MONGODB_URL);

const Event = mongoose.model('Event', {eventId: String, name: String, description: String });

exports.getEvents = function (callback) {
  Event.find().exec()
  .then(function(events) {
    var cleanevents = events.map( function(event) {
      return {eventId: event.eventId, name: event.name, description: event.description};
    })
    return callback(null, cleanevents);
  })
  .catch(function(err) {
    return callback(err);
  })
}

exports.getEvent = function (eventId, callback) {
  Event.findOne({eventId}).exec()
  .then(function(event) {
    if(!event)
      throw createError(404, 'event not found');

    var cleanevent = {eventId: event.eventId, name: event.name, description: event.description};
    return callback(null, cleanevent);
  })
  .catch(function(err) {
    return callback(err);
  })
}

exports.addEvent = function (data, callback) {
  data.eventId = uuid();
  Event.create(data)
  .then(function(event) {
    return callback(null, event);
  })
  .catch(function(err) {
    return callback(err);
  })
}

exports.updateEvent = function (data, callback) {
  Event.updateOneAndUpdate({eventId: data.eventId}, data)
  .then(function(event) {
    return callback(null, event);
  })
  .catch(function(err) {
    return callback(err);
  })
}

exports.deleteEvent = function (eventId, callback) {
  Event.deleteOne({eventId})
  .then(function() {
    return callback(null, true);
  })
  .catch(function(err) {
    return callback(err);
  })
}
