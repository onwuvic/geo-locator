const { ApolloServer } = require('apollo-server');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  context({ req, connection }) {
    if (connection) {
      return { ...connection.context };
    }
  },
});

const port = parseInt(process.env.PORT, 10) || 3000;

server.listen(port).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
