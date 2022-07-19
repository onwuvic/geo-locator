const path = require('path')
const { mergeResolvers } = require('@graphql-tools/merge')
const { loadFilesSync } = require('@graphql-tools/load-files')

const resolversArray = loadFilesSync(
  path.join(__dirname, './**/*.resolver.js'),
  {recursive: true}
)
const resolvers = mergeResolvers(resolversArray)

module.exports = resolvers