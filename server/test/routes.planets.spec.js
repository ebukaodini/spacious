process.env.NODE_ENV = 'test';

const { describe, it } = require('mocha')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../src/index')
const knex = require('../src/db/knex');
const { gql } = require('apollo-server-koa');

const assert = chai.assert
const expect = chai.expect
const should = chai.should();
chai.use(chaiHttp);

describe('Test Planet Resource', () => {

  beforeEach(() => {
    return knex.migrate.rollback()
      .then(() => { return knex.migrate.latest(); })
      .then(() => { return knex.seed.run(); });
  });

  it('should return all planets', (done) => {
    chai.request(server)
      .post('/graphql')
      .set({ "Authorization": process.env.StrapiBearerToken })
      .send({
        query: `
        query planets {
          planets(page: 1, pageSize: 2) {
            pagination {
              page
              pageSize
              total
            }
            nodes {
              id
              name
              description
              code
              pictureUrl
              population
              characters(limit: 3) {
                id
              }
            }
          }
        }
        `
      })
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res?.body?.data.planets.nodes[0].should.include.keys(
          'id', 'name', 'description', 'code', 'pictureUrl', 'population', 'characters'
        );
        done();
      });
  });

  it('should create a planet', (done) => {
    chai.request(server)
      .post('/graphql')
      .set({ "Authorization": process.env.StrapiBearerToken })
      .send({
        query: `
        mutation createPlanet {
          createPlanet(
            planetInfo: {
              name: "Tatooine"
              description: "Tatooine is a sparsely inhabited circumbinary desert planet located in the galaxy's Outer Rim Territories"
              pictureUrl: "https://upload.wikimedia.org/wikipedia/en/6/6d/Tatooine_%28fictional_desert_planet%29.jpg"
            }
          ) {
            id
            name
            description
            code
            pictureUrl
            population
            characters(limit: 3) {
              id
            }
          }
        }
      `
      })
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.body.data.createPlanet.should.include.keys(
          'id', 'name', 'description', 'code', 'pictureUrl', 'population', 'characters'
        );
        done()
      });
  })

  afterEach(() => {
    return knex.migrate.rollback();
  });

});