var app = require('../bin/www');
var chai = require('chai');
var request = require('supertest');

var expect = chai.expect;
describe('API Tests', function() {
  var sampleEvent1 = {
    name: 'event name1',
    description: 'event description'
  };

  var sampleEvent2 = {
    name: 'event name2',
    description: 'event description'
  };

  describe('# verify there are no events', function() {
    it('should get all events', function(done) {
      request(app) .get('/api/events') .end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        expect('Content-Type', /json/);
        expect(res.body).to.have.property('events');
        expect(res.body).to.have.property('events').to.be.an('array');
        expect(res.body).to.have.property('events').to.be.an('array').that.is.empty;
        done();
      });
    });
  });

  describe('## Create event 1', function() {
    it('should create an event', function(done) {
      request(app) .post('/api/events') .send(sampleEvent1) .end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        expect(res.body.event.name).to.equal('event name1');
        expect(res.body.event.description).to.equal('event description');
        sampleEvent1 = res.body.event;
        done();
      });
    });
  });

  describe('## check event 1', function() {
    it('should create an event', function(done) {
      request(app) .get('/api/events/' + sampleEvent1.eventId) .end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        expect(res.body.event.name).to.equal('event name1');
        expect(res.body.event.description).to.equal('event description');        
        done();
      });
    });
  });

  describe('## Create event 2', function() {
    it('should create an event', function(done) {
      request(app) .post('/api/events') .send(sampleEvent2) .end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        expect(res.body.event.name).to.equal('event name2');
        expect(res.body.event.description).to.equal('event description');
        sampleEvent2 = res.body.event;
        done();
      });
    });
  });

  describe('## Update event 1', function() {
    it('should update an event', function(done) {
      sampleEvent1.name = 'new name';
      sampleEvent1.description = 'new description';
      request(app) .put('/api/events/' + sampleEvent1.eventId) .send(sampleEvent1) .end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        expect(res.body.event.name).to.equal('new name');
        expect(res.body.event.description).to.equal('new description');
        sampleEvent1 = res.body.event;
        done();
      });
    });
  });

  describe('# get all events', function() {
    it('should get all events', function(done) {
      request(app) .get('/api/events') .end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        expect('Content-Type', /json/);
        expect(res.body).to.have.property('events');
        expect(res.body).to.have.property('events').to.be.an('array').to.have.lengthOf(2);
        done();
      });
    });
  });

  describe('## delete event 1', function() {
    it('should delete a event', function(done) {
      request(app) .del('/api/events/' + sampleEvent1.eventId) .end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe('## delete event 2', function() {
    it('should delete a event', function(done) {
      request(app) .del('/api/events/' + sampleEvent2.eventId) .end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe('## update none existant event', function() {
    it('should update no event', function(done) {
      request(app) .post('/api/events/nosuchitem') .end(function(err, res) {
        expect(res.statusCode).to.equal(404);
        done();
      });
    });
  });

  describe('## delete none existant event', function() {
    it('should delete no event', function(done) {
      request(app) .del('/api/events/nosuchitem') .end(function(err, res) {
        expect(res.statusCode).to.equal(404);
        done();
      });
    });
  });

  describe('# verify there are no events', function() {
    it('should get all events', function(done) {
      request(app) .get('/api/events') .end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        expect('Content-Type', /json/);
        expect(res.body).to.have.property('events');
        expect(res.body).to.have.property('events').to.be.an('array');
        expect(res.body).to.have.property('events').to.be.an('array').that.is.empty;
        done();
      });
    });
  });
});
