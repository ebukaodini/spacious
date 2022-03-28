const { gql } = require('apollo-server-koa')

const typeDef = gql`

  type CharacterNode {
    id:	ID!
    name: String!
    description: String!
    pictureUrl: String!
    planet: PlanetName!
    friendsCount: Int
    friends: [String!]
  }
  
  type Character {
    pagination: Pagination!
    nodes: [CharacterNode]!
  }

  type PlanetName {
    name: String!
  }

  input CharacterInfo {
    name: String!
    description: String!
    planet: String!
    pictureUrl: String!
    friends: [Int]
  }

  extend type Query {
    characters(pageSize: Int!, page: Int!): Character!
    character(id: Int!): CharacterNode
  }

  extend type Mutation {
    createCharacter(characterInfo: CharacterInfo): CharacterNode
  }
`;

const resolvers = {
  Query: {
    characters: async (root, { pageSize, page }, { models }) => {
      return await models.Characters.getAllCharacters({ pageSize, page })
    },

    character: async (root, { id }, { models }) => {
      return await models.Characters.getSingleCharacter(id)
    }
  },
  Mutation: {
    createCharacter: async (root, { characterInfo }, { models }) => {
      const { name, description, planet, pictureUrl, friends } = characterInfo
      return await models.Characters.addCharacter({ name, description, planet, pictureUrl, friends })
    }
  }
};

module.exports = {
  typeDef, resolvers
}