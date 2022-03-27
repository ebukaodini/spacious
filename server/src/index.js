// const Koa = require('koa');
// const bodyParser = require('koa-bodyparser');

// const indexRoutes = require('./routes/index');
// const planetsRoutes = require('./routes/planets');
// const charactersRoutes = require('./routes/characters');

// const app = new Koa();
const PORT =
  process.env.NODE_ENV === 'test' ?
    process.env.PORT_TEST :
    (process.env.PORT || 3000);

// app.use(bodyParser())
// app.use(indexRoutes.routes());
// app.use(planetsRoutes.routes());
// app.use(charactersRoutes.routes())

// const server = app.listen(PORT, () => {
//   console.log(`Server listening on port: ${PORT}`);
// });

// module.exports = server;


const Koa = require('koa')
const { ApolloServer } = require('apollo-server-koa')
const jwt = require('koa-jwt')
const schema = require('./schema/index')
const models = require('./db/models')

const app = new Koa();

app.use(jwt({ secret: process.env.JWT_SECRET, passthrough: true }));

const server = new ApolloServer({
  schema,
  context: ({ ctx: { state: user } }) => ({
    user,
    models,
  }),
  introspection: true,
  playground: true,
});
server.applyMiddleware({ app });

app.listen({ port: PORT }, async () => console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`));