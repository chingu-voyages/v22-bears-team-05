
const { ApolloServer } = require("apollo-server-express")
const typeDefs = require("./graphql/typeDefs")
const resolvers = require("./graphql/resolvers")


function createTestServer() {
    try {
        const apolloServer = new ApolloServer({
            typeDefs,
            resolvers,
            context: ({ req, res }) => ({ req, res }),
        })
        return apolloServer
    } catch (e) {
        throw e
    }
}

module.exports = createTestServer