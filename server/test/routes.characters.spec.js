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

describe('Test Characters Resource', () => {

  beforeEach(() => {
    return knex.migrate.rollback()
      .then(() => { return knex.migrate.latest(); })
      .then(() => { return knex.seed.run(); });
  });

  it('should return all characters', (done) => {
    chai.request(server)
      .post('/graphql')
      .set({ "Authorization": process.env.StrapiBearerToken })
      .send({
        query: `
        query characters {
          characters (page: 2, pageSize: 4) {
            pagination {
              total
              page
              pageSize
            }
            nodes {
              id
              name
              description
              pictureUrl
              planet {
                name
              }
              friendsCount
              friends
            }
          }
        }
        `
      })
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res?.body?.data.characters.nodes[0].should.include.keys(
          'id', 'name', 'description', 'planet', 'pictureUrl'
        );
        done();
      });
  });

  it('should return a character', (done) => {
    chai.request(server)
      .post('/graphql')
      .set({ "Authorization": process.env.StrapiBearerToken })
      .send({
        query: `
        query character {
          character (id: 1) {
            id
            name
            description
            pictureUrl
            planet {
              name
            }
            friendsCount
            friends
          }
        }
        `
      })
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res?.body?.data.character.should.include.keys(
          'id', 'name', 'description', 'planet', 'pictureUrl'
        );
        done();
      });
  });

  it('should create a character', (done) => {
    chai.request(server)
      .post('/graphql')
      .set({ "Authorization": process.env.StrapiBearerToken })
      .send({
        query: `
        mutation createCharacter {
          createCharacter(characterInfo: {
            name: "Chewbacca",
            description: "Chewbacca, known affectionately to his friends as Chewie, is a Wookiee male warrior, smuggler, mechanic, pilot, and resistance fighter.",
            planet: "FN-BBA-22",
            pictureUrl: "https://upload.wikimedia.org/wikipedia/en/6/6d/Chewbacca-2-.jpg",
            friends: [2, 4, 5]
          }) {
            id
            name
            description
            pictureUrl
            planet {
              name
            }
            friendsCount
            friends
          }
        }
      `
      })
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.body.data.createCharacter.should.include.keys(
          'id', 'name', 'description', 'planet', 'pictureUrl'
        );
        done()
      });
  })

  afterEach(() => {
    return knex.migrate.rollback();
  });

});