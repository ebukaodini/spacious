process.env.NODE_ENV = 'test';

const { describe, it } = require('mocha')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../src/index')

const should = chai.should();
chai.use(chaiHttp);

describe('Test Server Connection', () => {

  it('should return success', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.eql(200);
        res.type.should.eql('application/json');
        res.body.status.should.equal('success');
        res.body.message.should.eql('hello, world!');
        done();
      });
  });

});