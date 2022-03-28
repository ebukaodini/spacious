const { gql } = require('apollo-server-koa')

const typeDef = gql`

  type Pagination {
    total: Int!
    page: Int!
    pageSize: Int!
  }

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
    pagination: Pagination!
    nodes: [PlanetNode]!
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

  # name: String!, description: String!, pictureUrl: String!
  extend type Mutation {
    createPlanet(planetInfo: PlanetInfo!): PlanetNode!
  }
`;

const resolvers = {
  Query: {
    planets: async (root, { pageSize, page }, { models }) => {
      return await models.Planets.getAllPlanets(pageSize, page)
    }
  },
  Mutation: {
    createPlanet: async (root, {planetInfo}, { models }) => {
      const { name, description, pictureUrl } = planetInfo
      return await models.Planets.addPlanet({ name, description, pictureUrl })
    }
  }
};

module.exports = {
  typeDef, resolvers
}