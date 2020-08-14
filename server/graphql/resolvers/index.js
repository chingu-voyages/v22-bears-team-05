const userResolvers = require("./users");
const goalResolvers = require("./goals");
module.exports = {
  Query: {
    ...userResolvers.Query,
    ...goalResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...goalResolvers.Mutation,
  },
};
