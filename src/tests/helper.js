const {ApolloServer} = require('apollo-server')
const typeDefs = require('../typeDefs')
const resolvers = require('../resolvers')


const createTestServer = new ApolloServer({
  typeDefs,
  resolvers,
  mockEntireSchema: false,
  mocks: true,
  context: () => {}
})

module.exports = createTestServer
