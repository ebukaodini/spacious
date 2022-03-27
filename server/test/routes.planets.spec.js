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

describe('Test Planet routes', () => {

  beforeEach(() => {
    return knex.migrate.rollback()
      .then(() => { return knex.migrate.latest(); })
      .then(() => { return knex.seed.run(); });
  });

  describe('GET /graphql/planets', () => {
    it('should return all planets', (done) => {
      chai.request(server)
        .get('/graphql/planets')
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
          // the first object in the data array should
          // have the right keys
          res.body.data[0].should.include.keys(
            'id', 'name', 'description', 'code', 'pictureUrl', 'population', 'characters'
          );
          // the JSON response body data.characters
          // should have maximum of 3 values in the characters field of any record
          // e.g { ..., "characters": [ <= 3 integer values]}
          res.body.data[0].characters.length.should.lte(3);
          // should be an array of numbers
          assert(typeof res.body.data[0].characters[0] === 'number', 'should be number')
          done();
        });
    });
  });

  describe('POST /graphql/planets', () => {
    it('should add a planet', (done) => {
      chai.request(server)
        .post('/graphql/planets')
        .send({
          name: 'Earth',
          description: 'Where humans live',
          pictureUrl: 'https://static.wikia.nocookie.net/starwars/images/a/a9/Aargau.jpg'
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
            'id', 'name', 'description', 'code', 'pictureUrl', 'population', 'characters'
          );
          done()
        });
    })
  })

  afterEach(() => {
    return knex.migrate.rollback();
  });

});