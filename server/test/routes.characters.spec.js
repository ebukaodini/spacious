process.env.NODE_ENV = 'test';

const { describe, it } = require('mocha')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../src/index')
const knex = require('../src/db/knex')

const assert = chai.assert
const expect = chai.expect
const should = chai.should();
chai.use(chaiHttp);

describe('Test Characters routes', () => {

  beforeEach(() => {
    return knex.migrate.rollback()
      .then(() => { return knex.migrate.latest(); })
      .then(() => { return knex.seed.run(); });
  });

  describe('GET /graphql/characters', () => {
    it('should return all characters', (done) => {
      chai.request(server)
        .get('/graphql/characters')
        .end((err, res) => {
          // there should be no errors
          should.not.exist(err);
          // there should be a 200 status code
          res.status.should.equal(201);
          // the response should be JSON
          res.type.should.equal('application/json');
          // the JSON response body should have a
          // key-value pair of {"status": "success"}
          res.body.status.should.eql('success');
          // the first object in the data array should
          // have the right keys
          res.body.data[0].should.include.keys(
            'id', 'name', 'description', 'planet', 'pictureUrl'
          );
          done();
        });
    });
  });

  describe('GET /graphql/characters/1', () => {
    it('should return a single character', (done) => {
      chai.request(server)
        .get('/graphql/characters/1')
        .end((err, res) => {
          // there should be no errors
          should.not.exist(err);
          // there should be a 200 status code
          res.status.should.equal(201);
          // the response should be JSON
          res.type.should.equal('application/json');
          // the JSON response body should have a
          // key-value pair of {"status": "success"}
          res.body.status.should.eql('success');
          // the first object in the data array should
          // have the right keys
          res.body.data.should.include.keys(
            'id', 'name', 'description', 'planet', 'pictureUrl'
          );
          done();
        });
    });
  });

  describe('POST /graphql/characters', () => {
    it('should add a character', (done) => {
      chai.request(server)
        .post('/graphql/characters')
        .send({
          name: 'Human',
          description: 'A human on earth',
          planet: 'FN-BBA-22',
          pictureUrl: 'https://static.wikia.nocookie.net/starwars/images/a/a9/Aargau.jpg',
          friends: [1, 2, 3]
        })
        .end((err, res) => {
          // there should be no errors
          should.not.exist(err);
          // there should be a 201 status code
          res.status.should.equal(201);
          // the response should be JSON
          res.type.should.equal('application/json');
          // the JSON response body should have a
          // key-value pair of {"status": "success"}
          res.body.status.should.eql('success');
          // the data should have the right keys
          res.body.data.should.include.keys(
            'id', 'name', 'description', 'planet', 'pictureUrl'
          );
          done()
        });
    })
  })

  afterEach(() => {
    return knex.migrate.rollback();
  });

});