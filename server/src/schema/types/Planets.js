const { gql } = require('apollo-server-koa')
const authMiddleware = require('../../middleware/auth')

const typeDef = gql`

  type PlanetNode {
    id: ID!
    name: String!
    description: String!
    code: String!
    pictureUrl: String!
    population: Int!
    characters(limit: Int): [CharacterId]
  }

  type Planet {
    pagination: Pagination
    nodes: [PlanetNode]
    error: String
  }

  type CharacterId {
    id: ID
  }

  extend type Query {
    planets(pageSize: Int!, page: Int!): Planet!
  }

  input PlanetInfo {
    name: String!
    description: String!
    pictureUrl: String!
  }

  extend type Mutation {
    createPlanet(planetInfo: PlanetInfo!): PlanetNode!
  }
`;

const resolvers = {

  Query: {
    planets: async (root, { pageSize, page }, { models, auth }) => {
      authMiddleware(auth)
      return await models.Planets.getAllPlanets(pageSize, page)
    }
  },
  Mutation: {
    createPlanet: async (root, { planetInfo }, { models, auth }) => {
      authMiddleware(auth)
      const { name, description, pictureUrl } = planetInfo
      return await models.Planets.addPlanet({ name, description, pictureUrl })
    }
  }
};

module.exports = {
  typeDef, resolvers
}