const Koa = require('koa')
const { ApolloServer } = require('apollo-server-koa')
const jwt = require('koa-jwt')
const schema = require('./schema/index')
const models = require('./db/models')

const PORT =
  process.env.NODE_ENV === 'test' ?
    process.env.PORT_TEST :
    (process.env.PORT || 3000);

const app = new Koa();
// app.use(jwt({ secret: process.env.JWT_SECRET, passthrough: true }));

const server = new ApolloServer({
  schema,
  // context: ({ ctx: { state: user } }) => ({
  //   user,
  //   models,
  // }),
  context: (ctx) => ({
    models
  }),
  introspection: true,
  playground: true,
});
server.applyMiddleware({ app });

app.listen(
  { port: PORT },
  async () => console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
);

// planets
// query planets {
//   planets(page: 1, pageSize: 2) {
//     pagination {
//       page
//       pageSize
//       total
//     }
//     nodes {
//       id
//       name
//       description
//       code
//       pictureUrl
//       population
//       characters(limit: 3) {
//         id
//       }
//     }
//   }
// }

// characters
// query characters {
//   characters (page: 2, pageSize: 4) {
//     pagination {
//       total
//       page
//       pageSize
//     }
//     nodes {
//       id
//       name
//       description
//       pictureUrl
//       planet {
//         name
//       }
//       friendsCount
//       friends
//     }
//   }
// }

// character
// query character {
//   character (id: 1) {
//     id
//     name
//     description
//     pictureUrl
//     planet {
//       name
//     }
//     friendsCount
//     friends
//   }
// }

// planet
// mutation createPlanet {
//   createPlanet(
//     planetInfo: {
//       name: "Tatooine"
//       description: "Tatooine is a sparsely inhabited circumbinary desert planet located in the galaxy's Outer Rim Territories"
//       pictureUrl: "https://upload.wikimedia.org/wikipedia/en/6/6d/Tatooine_%28fictional_desert_planet%29.jpg"
//     }
//   ) {
//     id
//     name
//     description
//     code
//     pictureUrl
//     population
//     characters(limit: 3) {
//       id
//     }
//   }
// }

// character
// mutation createCharacter {
//   createCharacter(characterInfo: {
//     name: "Chewbacca",
//     description: "Chewbacca, known affectionately to his friends as Chewie, is a Wookiee male warrior, smuggler, mechanic, pilot, and resistance fighter.",
//     planet: "FN-BBA-22",
//     pictureUrl: "https://upload.wikimedia.org/wikipedia/en/6/6d/Chewbacca-2-.jpg",
//     friends: [2, 4, 5]
//   }) {
//     id
//     name
//     description
//     pictureUrl
//     planet {
//       name
//     }
//     friendsCount
//     friends
//   }
// }