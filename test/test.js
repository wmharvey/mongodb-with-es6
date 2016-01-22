var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
var MongoClient = require('mongodb').MongoClient;
var globalDB;
var id;

import getApp from '../src/app';
var app = getApp('Test');

describe('CRUD Test', () => {

  before('Clear test collection', (done) => {
    var url = 'mongodb://localhost/drinks';
    MongoClient.connect(url, function(err, db) {
      db.collection('tests').deleteMany({});
      globalDB = db;
      done();
    });
  });

  after('Close DB connection', () => {
    globalDB.close();
  });

  it('should post a new drink', (done) => {
    chai.request(app)
      .post('/drinks')
      .type('application/json')
      .send({
        type: 'smoothie',
        name: 'Strawberry',
        price: 4,
        calories: 400,
        ingredients: ['strawberry', 'orange juice']
      })
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        globalDB.collection('tests').findOne( {}, function (err, res) {
          expect(res.type).to.equal('smoothie');
          expect(res.name).to.equal('Strawberry');
          id = res._id;
          done();
        });
      });
  });

  describe('get all and by ID', () => {

    before('Add another drink', (done) => {
      chai.request(app)
        .post('/drinks')
        .send({
          type: 'coffee',
          name: 'Mocha',
          price: 3.5,
          calories: 350,
          ingredients: ['coffee', 'chocolate']
        })
        .end( () => done() );
    });

    it('should get all available drinks', (done) => {
      chai.request( app )
      .get('/drinks')
      .end( (err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect( res.text.toString() ).to.have.string('Mocha');
        expect( res.text.toString() ).to.have.string('Strawberry');
        done();
      });
    });

    it('should return a drink by ID', (done) => {
      chai.request(app)
      .get(`/drinks/${id}`)
      .end( (err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.text.toString()).to.have.string('Strawberry');
        expect(res.text.toString()).to.not.have.string('Mocha');
        done();
      });
    });

    it('should modify a drink by ID', (done) => {
      chai.request(app)
      .patch(`/drinks/${id}`)
      .send({
        name: 'Orange Peach Mango'
      })
      .end( (err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.text.toString()).to.have.string('Orange Peach Mango');
        expect(res.text.toString()).to.not.have.string('Strawberry');
        done();
      });
    });

    it('should delete a drink by ID', (done) => {
      chai.request(app)
      .delete(`/drinks/${id}`)
      .end( (err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        globalDB.collection('tests').findOne( {_id: id}, function (err, res) {
          expect(res).to.equal(null);
          done();
        });
      });
    });

  });

});
