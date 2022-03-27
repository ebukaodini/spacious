const { gql } = require('apollo-server-koa')

export const typeDef = gql`
  type Character {
    id: ID
    title: String
    createdAt: String
  }

  extend type Query {
    Characters: [Character]
    Character: Character
  }
`;

export const resolvers = {
  Query: {
    characters: async (root, args, { models }) => {
      return await models.Characters.getAllCharacters()
    },

    character: async (root, { id }, { models }) => {
      return await models.Characters.getSingleCharacter(id)
    }
  },
  Mutation: {
    addCharacter: async (root, { name, description, planet, pictureUrl, friends }, { models }) => {
      return await models.Characters.addCharacter({ name, description, planet, pictureUrl, friends })
    }
  }
};