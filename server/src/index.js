const Koa = require('koa')
const { ApolloServer } = require('apollo-server-koa')
const schema = require('./schema/index')
const models = require('./db/models');
const authMiddleware = require('./middleware/auth');

const PORT =
  process.env.NODE_ENV === 'test' ?
    process.env.PORT_TEST :
    (process.env.PORT || 3000);

const app = new Koa();

const server = new ApolloServer({
  schema,
  context: async (context) => {

    // authenticate request
    const token = context.ctx.request?.header?.authorization
    authMiddleware(token)

    return { models }
  },
  debug: false,
  formatError: (err) => {
    return { message: err.message.replace('Context creation failed: ', '') }
  },
  introspection: true,
  playground: true,
});

server.applyMiddleware({ app });

app.listen(
  { port: PORT },
  async () => console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
);
