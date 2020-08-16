const userResolvers = require("./users")
const goalResolvers = require("./goals")
const taskResolvers = require("./tasks")
module.exports = {
  Query: {
    ...userResolvers.Query,
    ...goalResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...goalResolvers.Mutation,
    ...taskResolvers.Mutation,
  },
}
