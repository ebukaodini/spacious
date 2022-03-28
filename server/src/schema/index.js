const { makeExecutableSchema } = require('graphql-tools')
const { gql } = require('apollo-server-koa')
const merge = require('lodash/merge')
const { typeDef: Planets, resolvers: PlanetResolvers } = require('./types/Planets')
const { typeDef: Characters, resolvers: CharacterResolvers } = require('./types/Characters')

const Query = gql`
  # Put fake fields on each Query & Mutation as below because currently schema cannot have empty type
  # If you had Query & Mutation fields not associated with a specific type you could put them here
  type Query {
    _empty: String
  }

  type Mutation {
    null: Boolean
  }

  type Pagination {
    total: Int!
    page: Int!
    pageSize: Int!
  }

`;

const SchemaDefinition = gql`
  schema {
    query: Query
    mutation: Mutation
  }
`;

const resolvers = {
};

module.exports = makeExecutableSchema({
  typeDefs: [
    SchemaDefinition,
    Query,
    Planets,
    Characters,
  ],
  resolvers: merge(
    resolvers,
    PlanetResolvers,
    CharacterResolvers,
  ),
});