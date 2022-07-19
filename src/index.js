const { ApolloServer } = require('apollo-server');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context({ req, connection }) {
    if (connection) {
      return { ...connection.context };
    }
  },
});

server.listen(3000).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
