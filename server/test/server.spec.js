process.env.NODE_ENV = 'test';

const { describe, it } = require('mocha')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../src/index')

const should = chai.should();
chai.use(chaiHttp);

describe('Test Server Connection', () => {

  it('should connect', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        should.not.exist(err);
        done();
      });
  });

  it('should return not found', (done) => {
    chai.request(server)
    .get('/')
    .end((err, res) => {
      should.not.exist(err);
      res.status.should.eql(404);
      res.text.should.eql('Not Found')
      done();
    });
  });

});